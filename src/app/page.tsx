import type { Metadata } from 'next';
import Home from '@/pages/Home';

export const metadata: Metadata = {
  title: 'ChitraTech Shop | Home',
  description: 'Discover featured products, curated collections, categories, and modern fashion essentials.',
};

export default function HomePage() {
  return <Home />;
}
