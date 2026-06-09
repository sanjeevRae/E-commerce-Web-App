'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { products } from '@/data/products';

export default function MainProduct() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8f1f35]">All products</p>
            <h1 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">Everything you need, in one place.</h1>
          </div>
          <p className="font-body max-w-md text-sm leading-6 text-[#666666]">
            Browse the full ChitraTech Shop collection with curated staples, fresh seasonal drops, and modern essentials.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="group rounded-[28px] border border-[#ededed] p-4 transition-shadow hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)]">
              <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-[#f5f5f5]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-body text-base font-semibold">{product.name}</h2>
                  <span className="font-body text-sm font-semibold">${product.price}</span>
                </div>
                <p className="font-body mt-2 text-sm leading-6 text-[#666666]">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
