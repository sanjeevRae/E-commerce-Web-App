export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating?: number;
  reviewCount?: number;
  stock?: number;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Collection {
  id: string;
  title: string;
  image: string;
}
