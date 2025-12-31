// Type definitions for Jas Soni Photography E-commerce

export type Collection = 'Nature' | 'City' | 'Abstract' | 'Portraits';
export type Orientation = 'portrait' | 'landscape' | 'square';
export type ColorTone = 'warm' | 'cool' | 'neutral' | 'vibrant';
export type FrameStyle = 'none' | 'black' | 'white';

export interface CanvasSize {
  id: string;
  label: string;
  width: number;
  height: number;
  price: number;
}

export interface PhotoProduct {
  id: string;
  title: string;
  slug: string;
  images: string[];
  collection: Collection[];
  tags: string[];
  basePrice: number;
  sizes: CanvasSize[];
  description: string;
  metadata: {
    location?: string;
    dateTaken?: string;
    camera?: string;
    lens?: string;
  };
  availability: boolean;
  featured: boolean;
  orientation: Orientation;
  colorTone: ColorTone;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  productId: string;
  product: PhotoProduct;
  sizeId: string;
  size: CanvasSize;
  frameStyle: FrameStyle;
  giftWrap: boolean;
  signedByArtist: boolean;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: {
    address: Address;
    option: ShippingOption;
  };
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[]; // product IDs
}
