import type { Metadata } from 'next';
import Cart from '@/pages/Cart';

export const metadata: Metadata = {
  title: 'Cart | ChitraTech Shop',
  description: 'Review your selected products and proceed to checkout.',
};

export default function CartPage() {
  return <Cart />;
}
