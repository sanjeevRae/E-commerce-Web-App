export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton Tee',
    price: 39,
    rating: 4.8,
    image: '/product_01.jpg',
    category: 'Men',
    description: 'A breathable everyday tee crafted for comfort, layering, and easy styling through every season.',
  },
  {
    id: '2',
    name: 'Relaxed Linen Shirt',
    price: 64,
    rating: 4.9,
    image: '/product_02.jpg',
    category: 'Women',
    description: 'Soft linen texture with a polished drape, ideal for warm days and elevated casual looks.',
  },
  {
    id: '3',
    name: 'Minimal Hoodie',
    price: 72,
    rating: 4.7,
    image: '/product_03.jpg',
    category: 'Best',
    description: 'A clean silhouette hoodie with a premium soft interior and modern street-ready fit.',
  },
  {
    id: '4',
    name: 'Tailored Wide Pants',
    price: 81,
    rating: 4.6,
    image: '/product_04.jpg',
    category: 'Women',
    description: 'Structured yet fluid trousers designed to bring refined movement and all-day versatility.',
  },
  {
    id: '5',
    name: 'Urban Denim Jacket',
    price: 95,
    rating: 4.8,
    image: '/product_05.jpg',
    category: 'Men',
    description: 'A timeless denim layer with a crisp finish, built for transitional weather and standout layering.',
  },
  {
    id: '6',
    name: 'Soft Knit Polo',
    price: 58,
    rating: 4.5,
    image: '/product_06.jpg',
    category: 'Best',
    description: 'A refined knit polo balancing structure, softness, and understated luxury for smart daily wear.',
  },
  {
    id: '7',
    name: 'Everyday Cargo Trousers',
    price: 77,
    rating: 4.7,
    image: '/product_07.jpg',
    category: 'Men',
    description: 'Functional utility pockets meet a streamlined fit for practical comfort and contemporary styling.',
  },
  {
    id: '8',
    name: 'Flow Midi Dress',
    price: 88,
    rating: 4.9,
    image: '/product_08.jpg',
    category: 'Women',
    description: 'An elegant midi silhouette with light movement and versatile charm for both day and evening.',
  },
];
