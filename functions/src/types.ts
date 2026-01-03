export interface Variant {
  id: string;
  label: string;
  width: number;
  height: number;
  unit: 'in' | 'cm';
  basePrice: number; // minor units
  sku: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'draft' | 'published';
  heroImage: string;
  galleryImages: string[];
  tags: string[];
  collections: string[];
  orientation: 'portrait' | 'landscape' | 'square';
  metadata?: {
    location?: string;
    dateTaken?: string;
    camera?: string;
  };
  variants: Variant[];
  addOns?: {
    frame?: { black: number; white: number };
    giftWrap?: number;
    signed?: number;
  };
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface CartItemInput {
  productId: string;
  variantId: string;
  quantity: number;
  addOns?: {
    frame?: 'black' | 'white' | 'none';
    giftWrap?: boolean;
    signed?: boolean;
  };
}

export interface CartItemSnapshot {
  productId: string;
  variantId: string;
  quantity: number;
  addOns?: {
    frame?: 'black' | 'white' | 'none';
    giftWrap?: boolean;
    signed?: boolean;
  };
  unitPrice: number; // minor units
  lineTotal: number; // minor units
  title: string;
  variantLabel: string;
  heroImage: string;
}

export interface Cart {
  id: string;
  userId?: string;
  email?: string;
  currency: string;
  items: CartItemSnapshot[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingOption?: 'standard' | 'express';
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface Order extends Cart {
  orderNumber: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentRef?: string;
  fulfilmentStatus: 'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postcode: string;
    country: string;
    phone?: string;
  };
  trackingUrl?: string;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface PricingConfig {
  currency: string;
  shipping: {
    standard: number;
    express: number;
  };
  addOns: {
    frame: { black: number; white: number };
    giftWrap: number;
    signed: number;
  };
}

