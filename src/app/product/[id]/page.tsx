import type { Metadata } from 'next';
import ProductDetail from '@/pages/ProductDetail';
import { products } from '@/data/products';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(item => item.id === id);

  return {
    title: product ? `${product.name} | ChitraTech Shop` : 'Product | ChitraTech Shop',
    description: product?.description || 'Explore product details, size options, and related picks.',
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
