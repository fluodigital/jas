// Mock product data
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  collections: string[];
  tags: string[];
  basePrice: number;
  sizeVariants: SizeVariant[];
  addOns: AddOn[];
  metadata: ProductMetadata;
  featured: boolean;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  orientation: 'portrait' | 'landscape' | 'square';
}

export interface SizeVariant {
  name: string;
  dimensions: string;
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  type: 'frame' | 'gift-wrap' | 'signature';
}

export interface ProductMetadata {
  location: string;
  dateTaken: string;
  camera?: string;
  lens?: string;
}

export const sizeVariants: SizeVariant[] = [
  { name: '8x10', dimensions: '8" × 10"', price: 49 },
  { name: '12x16', dimensions: '12" × 16"', price: 79 },
  { name: '16x20', dimensions: '16" × 20"', price: 129 },
  { name: '24x36', dimensions: '24" × 36"', price: 199 },
];

export const addOns: AddOn[] = [
  { id: 'frame-black', name: 'Black Frame', price: 29, type: 'frame' },
  { id: 'frame-white', name: 'White Frame', price: 29, type: 'frame' },
  { id: 'gift-wrap', name: 'Gift Wrap', price: 9, type: 'gift-wrap' },
  { id: 'signature', name: 'Signed by Jas', price: 15, type: 'signature' },
];

export const products: Product[] = [
  {
    id: 'mountain-peak',
    title: 'Mountain Peak',
    slug: 'mountain-peak',
    description: 'A breathtaking view of mountain peaks at sunset, capturing the raw beauty of nature.',
    images: ['https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjY4NzgzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['nature', 'landscape'],
    tags: ['mountains', 'landscape', 'nature', 'sunset'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Swiss Alps',
      dateTaken: 'September 2024',
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
    },
    featured: true,
    availability: 'in-stock',
    orientation: 'landscape',
  },
  {
    id: 'urban-geometry',
    title: 'Urban Geometry',
    slug: 'urban-geometry',
    description: 'Modern architecture meets artistic vision in this striking urban composition.',
    images: ['https://images.unsplash.com/photo-1548566862-2c9b1fed780a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjY4NjA1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['city', 'architecture'],
    tags: ['urban', 'architecture', 'modern', 'geometric'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'New York City',
      dateTaken: 'October 2024',
      camera: 'Sony A7IV',
      lens: '16-35mm f/2.8',
    },
    featured: true,
    availability: 'in-stock',
    orientation: 'portrait',
  },
  {
    id: 'abstract-light',
    title: 'Abstract Light',
    slug: 'abstract-light',
    description: 'A mesmerizing play of light and color creates an abstract masterpiece.',
    images: ['https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NjY4NTYzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['abstract'],
    tags: ['abstract', 'color', 'light', 'artistic'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Studio',
      dateTaken: 'August 2024',
    },
    featured: false,
    availability: 'in-stock',
    orientation: 'square',
  },
  {
    id: 'forest-path',
    title: 'Forest Path',
    slug: 'forest-path',
    description: 'A serene forest path inviting you into the depths of nature.',
    images: ['https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBmb3Jlc3R8ZW58MXx8fHwxNzY2OTU2NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['nature'],
    tags: ['forest', 'nature', 'trees', 'path'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Pacific Northwest',
      dateTaken: 'July 2024',
      camera: 'Nikon Z8',
      lens: '24-120mm f/4',
    },
    featured: true,
    availability: 'in-stock',
    orientation: 'portrait',
  },
  {
    id: 'ocean-serenity',
    title: 'Ocean Serenity',
    slug: 'ocean-serenity',
    description: 'The peaceful beauty of ocean waves under a vast open sky.',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGJlYWNofGVufDF8fHx8MTc2Njg2OTM4MHww&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['nature', 'landscape'],
    tags: ['ocean', 'beach', 'water', 'seascape'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Maldives',
      dateTaken: 'June 2024',
      camera: 'Canon EOS R6',
      lens: '70-200mm f/2.8',
    },
    featured: false,
    availability: 'in-stock',
    orientation: 'landscape',
  },
  {
    id: 'portrait-soul',
    title: 'Portrait Soul',
    slug: 'portrait-soul',
    description: 'An intimate portrait capturing raw emotion and personality.',
    images: ['https://images.unsplash.com/photo-1544124094-8aea0374da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjkzODE3OXww&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['portraits'],
    tags: ['portrait', 'people', 'emotion', 'human'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Studio',
      dateTaken: 'November 2024',
      camera: 'Sony A7III',
      lens: '85mm f/1.4',
    },
    featured: false,
    availability: 'low-stock',
    orientation: 'portrait',
  },
  {
    id: 'city-lights',
    title: 'City Lights',
    slug: 'city-lights',
    description: 'The vibrant energy of urban life captured in a stunning cityscape.',
    images: ['https://images.unsplash.com/photo-1493134799591-2c9eed26201a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjY4NzE0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['city'],
    tags: ['city', 'urban', 'skyline', 'night'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Tokyo',
      dateTaken: 'December 2024',
      camera: 'Fujifilm X-T5',
      lens: '16-55mm f/2.8',
    },
    featured: true,
    availability: 'in-stock',
    orientation: 'landscape',
  },
  {
    id: 'sunset-dreams',
    title: 'Sunset Dreams',
    slug: 'sunset-dreams',
    description: 'A magical sunset painting the sky in hues of gold and crimson.',
    images: ['https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY2OTMzODk5fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    collections: ['nature', 'landscape'],
    tags: ['sunset', 'landscape', 'sky', 'golden-hour'],
    basePrice: 49,
    sizeVariants,
    addOns,
    metadata: {
      location: 'Grand Canyon',
      dateTaken: 'May 2024',
      camera: 'Canon EOS R5',
      lens: '100-400mm f/4.5-5.6',
    },
    featured: true,
    availability: 'in-stock',
    orientation: 'landscape',
  },
];

export const collections = [
  { id: 'nature', name: 'Nature', description: 'Natural landscapes and wildlife' },
  { id: 'city', name: 'City', description: 'Urban scenes and architecture' },
  { id: 'abstract', name: 'Abstract', description: 'Abstract and artistic compositions' },
  { id: 'portraits', name: 'Portraits', description: 'People and emotions' },
  { id: 'landscape', name: 'Landscape', description: 'Scenic views and vistas' },
  { id: 'architecture', name: 'Architecture', description: 'Buildings and structures' },
];
