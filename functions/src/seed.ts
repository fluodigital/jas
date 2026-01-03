import { Firestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import { DEFAULT_PRICING } from './config.js';
import { Product } from './types.js';

export async function seedProducts(db: Firestore) {
  const products: Omit<Product, 'createdAt' | 'updatedAt'>[] = [
    {
      id: 'city-lights',
      title: 'City Lights',
      slug: 'city-lights',
      description: 'Moody cityscape with long exposure light trails.',
      status: 'published',
      heroImage: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1400',
      galleryImages: [
        'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400',
      ],
      tags: ['city', 'night', 'light-trails'],
      collections: ['City'],
      orientation: 'landscape',
      metadata: { location: 'London', dateTaken: '2024-05-12', camera: 'Sony A7 IV' },
      variants: [
        { id: '12x16', label: '12x16', width: 12, height: 16, unit: 'in', basePrice: 8900, sku: 'CL-12x16', isActive: true },
        { id: '16x20', label: '16x20', width: 16, height: 20, unit: 'in', basePrice: 11900, sku: 'CL-16x20', isActive: true },
        { id: '24x36', label: '24x36', width: 24, height: 36, unit: 'in', basePrice: 18900, sku: 'CL-24x36', isActive: true },
      ],
      addOns: DEFAULT_PRICING.addOns,
    },
    {
      id: 'golden-hour',
      title: 'Golden Hour',
      slug: 'golden-hour',
      description: 'Soft golden light over a quiet landscape.',
      status: 'published',
      heroImage: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?w=1400',
      galleryImages: [
        'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?w=1400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400',
      ],
      tags: ['nature', 'sunset'],
      collections: ['Nature'],
      orientation: 'landscape',
      metadata: { location: 'Cotswolds', dateTaken: '2024-03-05', camera: 'Canon R5' },
      variants: [
        { id: '12x16', label: '12x16', width: 12, height: 16, unit: 'in', basePrice: 7900, sku: 'GH-12x16', isActive: true },
        { id: '16x20', label: '16x20', width: 16, height: 20, unit: 'in', basePrice: 10500, sku: 'GH-16x20', isActive: true },
        { id: '24x36', label: '24x36', width: 24, height: 36, unit: 'in', basePrice: 16900, sku: 'GH-24x36', isActive: true },
      ],
      addOns: DEFAULT_PRICING.addOns,
    },
    {
      id: 'abstract-lines',
      title: 'Abstract Lines',
      slug: 'abstract-lines',
      description: 'Minimal abstract composition with strong lines.',
      status: 'published',
      heroImage: 'https://images.unsplash.com/photo-1602128110234-2d11c0aaadfe?w=1400',
      galleryImages: [
        'https://images.unsplash.com/photo-1602128110234-2d11c0aaadfe?w=1400',
        'https://images.unsplash.com/photo-1652780241487-f396513216ef?w=1400',
      ],
      tags: ['abstract', 'minimal'],
      collections: ['Abstract'],
      orientation: 'portrait',
      metadata: { location: 'Studio', dateTaken: '2024-01-10', camera: 'Fuji GFX' },
      variants: [
        { id: '12x16', label: '12x16', width: 12, height: 16, unit: 'in', basePrice: 7200, sku: 'AL-12x16', isActive: true },
        { id: '16x20', label: '16x20', width: 16, height: 20, unit: 'in', basePrice: 9500, sku: 'AL-16x20', isActive: true },
        { id: '20x30', label: '20x30', width: 20, height: 30, unit: 'in', basePrice: 13900, sku: 'AL-20x30', isActive: true },
      ],
      addOns: DEFAULT_PRICING.addOns,
    },
  ];

  const batch = db.batch();
  const productsCol = db.collection('products');

  for (const product of products) {
    const ref = productsCol.doc(product.id);
    batch.set(ref, {
      ...product,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  const settingsRef = db.collection('settings').doc('store');
  batch.set(settingsRef, DEFAULT_PRICING, { merge: true });

  await batch.commit();
}

