import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { REGION, DEFAULT_PRICING } from './config.js';
import { CartItemInput, CartItemSnapshot, PricingConfig, Product } from './types.js';
import { seedProducts } from './seed.js';

admin.initializeApp();
const db = admin.firestore();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error('STRIPE_SECRET_KEY is required');
}
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-12-18.acacia' });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const getPricing = async (): Promise<PricingConfig> => {
  const snap = await db.collection('settings').doc('store').get();
  if (!snap.exists) return DEFAULT_PRICING;
  return { ...DEFAULT_PRICING, ...(snap.data() as Partial<PricingConfig>) };
};

const loadProductById = async (id: string) => {
  const snap = await db.collection('products').doc(id).get();
  if (!snap.exists) return null;
  const data = snap.data() as Product;
  if (data.status !== 'published') return null;
  return { id: snap.id, ...data } as Product;
};

const loadProductBySlug = async (slug: string) => {
  const snap = await db.collection('products').where('slug', '==', slug).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  const data = doc.data() as Product;
  if (data.status !== 'published') return null;
  return { id: doc.id, ...data } as Product;
};

const priceCartItems = async (items: CartItemInput[]) => {
  const pricing = await getPricing();
  let subtotal = 0;
  const priced: CartItemSnapshot[] = [];

  for (const item of items) {
    const product = await loadProductById(item.productId);
    if (!product) throw new functions.https.HttpsError('not-found', 'Product not found');
    const variant = product.variants.find((v) => v.id === item.variantId && v.isActive);
    if (!variant) throw new functions.https.HttpsError('invalid-argument', 'Variant not available');

    const frameDelta =
      item.addOns?.frame && item.addOns.frame !== 'none'
        ? pricing.addOns.frame[item.addOns.frame]
        : 0;
    const giftWrapDelta = item.addOns?.giftWrap ? pricing.addOns.giftWrap : 0;
    const signedDelta = item.addOns?.signed ? pricing.addOns.signed : 0;

    const unitPrice = variant.basePrice + frameDelta + giftWrapDelta + signedDelta;
    const lineTotal = unitPrice * item.quantity;
    subtotal += lineTotal;

    priced.push({
      productId: product.id,
      variantId: variant.id,
      quantity: item.quantity,
      addOns: item.addOns,
      unitPrice,
      lineTotal,
      title: product.title,
      variantLabel: variant.label,
      heroImage: product.heroImage,
    });
  }

  return { pricing, subtotal, items: priced };
};

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/products', async (req, res, next) => {
  try {
    const { collection, tag, orientation, search, sort = 'featured', limit = '50' } = req.query;
    let query: FirebaseFirestore.Query = db
      .collection('products')
      .where('status', '==', 'published')
      .limit(Number(limit));

    if (orientation) {
      query = query.where('orientation', '==', String(orientation));
    }
    if (collection) {
      query = query.where('collections', 'array-contains', String(collection));
    }
    if (tag) {
      query = query.where('tags', 'array-contains', String(tag));
    }

    const snap = await query.get();
    let products = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Product) }));

    if (search) {
      const text = String(search).toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(text) ||
          p.tags.some((t) => t.toLowerCase().includes(text)),
      );
    }

    if (sort === 'price-low') products.sort((a, b) => a.variants[0].basePrice - b.variants[0].basePrice);
    if (sort === 'price-high') products.sort((a, b) => b.variants[0].basePrice - a.variants[0].basePrice);

    res.json({ products });
  } catch (err) {
    next(err);
  }
});

app.get('/products/:slug', async (req, res, next) => {
  try {
    const product = await loadProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
});

app.post('/cart', async (req, res, next) => {
  try {
    const { cartId, userId, email, items, shippingOption = 'standard' } = req.body as {
      cartId?: string;
      userId?: string;
      email?: string;
      items: CartItemInput[];
      shippingOption?: 'standard' | 'express';
    };

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const { pricing, subtotal, items: pricedItems } = await priceCartItems(items);
    const shipping =
      shippingOption === 'express' ? pricing.shipping.express : pricing.shipping.standard;
    const total = subtotal + shipping;

    const id = cartId || uuid();
    await db.collection('carts').doc(id).set(
      {
        id,
        userId,
        email,
        currency: pricing.currency,
        items: pricedItems,
        subtotal,
        shipping,
        total,
        shippingOption,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    res.json({ cartId: id, subtotal, shipping, total, currency: pricing.currency, items: pricedItems });
  } catch (err) {
    next(err);
  }
});

app.post('/checkout', async (req, res, next) => {
  try {
    const { cartId, email, shippingAddress, shippingOption = 'standard' } = req.body;
    if (!cartId) return res.status(400).json({ error: 'cartId required' });

    const cartSnap = await db.collection('carts').doc(cartId).get();
    if (!cartSnap.exists) return res.status(404).json({ error: 'Cart not found' });
    const cart = cartSnap.data();
    const amount = cart.total as number;

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: cart.currency || 'GBP',
      receipt_email: email,
      metadata: {
        cartId,
      },
      automatic_payment_methods: { enabled: true },
    });

    const orderId = uuid();
    const orderNumber = `ORD-${Math.floor(Math.random() * 900000 + 100000)}`;
    await db.collection('orders').doc(orderId).set({
      id: orderId,
      orderNumber,
      cartId,
      userId: cart.userId || null,
      email,
      shippingAddress,
      shippingOption,
      items: cart.items,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      total: cart.total,
      currency: cart.currency,
      paymentStatus: 'pending',
      fulfilmentStatus: 'created',
      paymentRef: intent.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ clientSecret: intent.client_secret, orderId, orderNumber });
  } catch (err) {
    next(err);
  }
});

app.post('/admin/seed', async (_req, res, next) => {
  try {
    await seedProducts(db);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

const api = functions.region(REGION).https.onRequest(app);

// Stripe webhook must use raw body
export const stripeWebhook = functions
  .region(REGION)
  .https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sig || !whSecret) {
      return res.status(400).send('Missing signature');
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sig as string,
        whSecret,
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    const processedRef = db.collection('webhookEvents').doc(event.id);
    const processed = await processedRef.get();
    if (processed.exists) {
      return res.json({ received: true });
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const orderSnap = await db
        .collection('orders')
        .where('paymentRef', '==', intent.id)
        .limit(1)
        .get();
      if (!orderSnap.empty) {
        const orderDoc = orderSnap.docs[0];
        await orderDoc.ref.set(
          {
            paymentStatus: 'paid',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
    }

    await processedRef.set({ receivedAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.json({ received: true });
  });

export { api };

