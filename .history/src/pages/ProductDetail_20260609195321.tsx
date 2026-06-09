'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BadgePercent, ChevronDown, Clock, Menu, Package, Search, ShoppingBag, Star, Truck } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const shippingItems = [
  { label: 'Discount', value: 'Disc 50%', icon: BadgePercent },
  { label: 'Package', value: 'Regular Package', icon: Package },
  { label: 'Delivery Time', value: '3-4 Working Days', icon: Clock },
  { label: 'Estimation Arrive', value: '10 - 12 October 2024', icon: Truck },
];

const sizes = ['S', 'M', 'L', 'XL'];

export default function ProductDetail({ productId }: { productId: string }) {
  const router = useRouter();
  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find(item => item.id === productId) ?? products[0],
    [productId],
  );

  const relatedProducts = useMemo(
    () => products.filter(item => item.id !== product.id).slice(0, 4),
    [product.id],
  );

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <CartDrawer />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <button aria-label="Open menu" className="shrink-0">
              <Menu size={24} strokeWidth={1.4} />
            </button>
            <button onClick={() => router.push('/')} className="font-serif text-lg font-semibold text-[#111111] sm:text-2xl">
              ChitraTech Shop
            </button>
            <div className="flex items-center gap-4 text-xs sm:gap-7 sm:text-sm">
              <button className="hidden sm:inline-flex">About</button>
              <button className="hidden underline underline-offset-4 sm:inline-flex">FAQs</button>
              <button aria-label="Search">
                <Search size={16} />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="icon-button relative">
                <ShoppingBag size={16} />
                {totalItems > 0 && <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-[#111111] px-1 text-[10px] text-white">{totalItems}</span>}
              </button>
            </div>
          </div>

          <div className="font-body flex flex-wrap items-center gap-2 text-xs text-[#777777] sm:text-sm">
            <Link href="/" className="hover:text-[#111111]">Home</Link>
            <span>/</span>
            <Link href="/main-product" className="hover:text-[#111111]">Products</Link>
            <span>/</span>
            <span className="text-[#111111]">{product.name}</span>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[32px] bg-[#f4f4f4]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {[product, ...relatedProducts.slice(0, 3)].map(item => (
                <button key={item.id} className="overflow-hidden rounded-[20px] bg-[#f4f4f4]">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8f1f35]">{product.category}</p>
            <h1 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex gap-1 text-[#ffb000]">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} className="fill-current" />
                ))}
              </div>
              <span className="font-body text-sm text-[#777777]">{product.rating}/5 rating</span>
            </div>
            <p className="font-body mt-5 text-lg font-semibold">${product.price}</p>
            <p className="font-body mt-5 text-sm leading-7 text-[#666666]">{product.description}</p>

            <div className="mt-8">
              <p className="font-body mb-3 text-sm font-semibold">Select size</p>
              <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`font-body rounded-full border px-4 py-2 text-sm ${selectedSize === size ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#d9d9d9] text-[#111111]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="font-body inline-flex items-center gap-4 rounded-full border border-[#e2e2e2] px-4 py-3 text-sm">
                <button onClick={() => setQuantity(current => Math.max(1, current - 1))}>−</button>
                <span className="font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(current => current + 1)}>+</button>
              </div>
              <button
                onClick={() => addToCart(product, quantity, selectedSize)}
                className="font-body rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white"
              >
                Add to cart
              </button>
            </div>

            <div className="mt-8 space-y-3">
              <article className="rounded-xl border border-[#e6e6e6] p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-body font-medium">Description & Fit</h3>
                  <ChevronDown size={16} />
                </div>
                <p className="font-body text-sm leading-relaxed text-[#777777]">
                  {product.description} Loose but refined silhouette, soft inner feel, and versatile styling for casual or elevated days.
                </p>
              </article>

              <article className="rounded-xl border border-[#e6e6e6] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-medium">Shipping</h3>
                  <ChevronDown size={16} />
                </div>
                <div className="grid gap-4 text-xs sm:grid-cols-2">
                  {shippingItems.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-[#111111]">
                        <Icon size={14} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[#777777]">{label}</span>
                        <strong className="break-words">{value}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <h2 className="mb-8 text-center font-body text-3xl font-normal sm:mb-10 sm:text-5xl">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {relatedProducts.map(item => (
              <button key={item.id} onClick={() => router.push(`/product/${item.id}`)} className="font-body text-left">
                <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-[#eeeeee]">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mb-1 text-sm font-semibold leading-snug">{item.name}</h3>
                <div className="mb-2 flex flex-wrap items-center gap-1 text-[#ffb000]">
                  {[...Array(5)].map((_, index) => <Star key={index} size={12} className="fill-current" />)}
                  <span className="ml-0 text-xs text-[#777777] sm:ml-2">{item.rating}/5</span>
                </div>
                <p className="text-sm">${item.price}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="py-4">
          <article className="rounded-xl border border-[#e6e6e6] p-5 sm:mt-16 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <img src="/testimonial_02.jpg" alt="Alex Mathio" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <strong className="block">Alex Mathio</strong>
                  <div className="mt-1 flex flex-wrap gap-1 text-[#ffb000]">
                    {[...Array(5)].map((_, index) => <Star key={index} size={15} className="fill-current" />)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#777777]">13 Oct 2024</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[#777777]">
              ChitraTech Shop&apos;s dedication to sustainability and ethical practices resonates strongly with today&apos;s consumers.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
