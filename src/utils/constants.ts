export const ITEM_TYPES = [
  'Shirt',
  'Pant', 
  'Shoes',
  'Sports Gear',
  'Electronics',
  'Books',
  'Accessories',
  'Custom'
] as const;

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'type', label: 'Type' },
  { value: 'date-new', label: 'Newest First' },
  { value: 'date-old', label: 'Oldest First' }
] as const;

export const SAMPLE_ITEMS = [
  {
    id: '1',
    name: 'Classic Denim Jacket',
    type: 'Shirt',
    description: 'A timeless denim jacket perfect for casual outings. Made from premium cotton denim with a comfortable fit and classic styling that never goes out of fashion.',
    coverImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272454315-7ad9f0368327?w=600&h=600&fit=crop'
    ],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Athletic Running Shoes',
    type: 'Shoes',
    description: 'High-performance running shoes designed for comfort and durability. Features advanced cushioning technology and breathable mesh upper for optimal performance.',
    coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop'
    ],
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Headphones',
    type: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation technology. Delivers crystal-clear audio quality with up to 30 hours of battery life for uninterrupted listening.',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'
    ],
    createdAt: new Date('2024-01-12')
  },
  {
    id: '4',
    name: 'Vintage Leather Backpack',
    type: 'Accessories',
    description: 'Handcrafted leather backpack with vintage appeal. Perfect for daily use with multiple compartments and durable construction that ages beautifully over time.',
    coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&h=600&fit=crop'
    ],
    createdAt: new Date('2024-01-08')
  },
  {
    id: '5',
    name: 'Professional Tennis Racket',
    type: 'Sports Gear',
    description: 'Professional-grade tennis racket designed for competitive players. Features lightweight carbon fiber construction with optimal balance for power and control.',
    coverImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop'
    ],
    createdAt: new Date('2024-01-05')
  },
  {
    id: '6',
    name: 'Programming Fundamentals Book',
    type: 'Books',
    description: 'Comprehensive guide to programming fundamentals covering algorithms, data structures, and best practices. Perfect for beginners and intermediate developers.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'
    ],
    createdAt: new Date('2024-01-01')
  }
];