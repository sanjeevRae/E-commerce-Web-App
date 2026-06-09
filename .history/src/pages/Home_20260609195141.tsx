'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { products } from '@/data/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />
      <CartDrawer />

      <main className="pt-28 sm:pt-32">
        <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="font-body mb-4 text-xs uppercase tracking-[0.22em] text-[#8f1f35]">New season arrival</p>
              <h1 className="font-display text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
                Curated fashion for everyday confidence.
              </h1>
              <p className="font-body mt-6 max-w-xl text-sm leading-7 text-[#666666] sm:text-base">
                Discover elevated essentials, trending silhouettes, and timeless pieces designed for comfort, movement, and standout styling.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/main-product" className="font-body rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white">
                  Shop now
                </Link>
                <a href="#featured" className="font-body rounded-full border border-[#d7d7d7] px-6 py-3 text-sm font-semibold text-[#111111]">
                  Explore featured
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {products.slice(0, 4).map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="overflow-hidden rounded-[28px] bg-[#f7f7f7] p-4 transition-transform hover:-translate-y-1">
                  <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-[#ececec]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-4">
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-[#8c8c8c]">{product.category}</p>
                    <h2 className="mt-2 font-body text-lg font-semibold">{product.name}</h2>
                    <p className="font-body mt-1 text-sm text-[#666666]">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8f1f35]">Featured products</p>
                <h2 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">Fresh picks for every style.</h2>
              </div>
              <Link href="/main-product" className="font-body text-sm font-semibold text-[#111111] underline underline-offset-4">
                View all products
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {products.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="group rounded-[28px] border border-[#ededed] p-4 transition-shadow hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)]">
                  <div className="aspect-square overflow-hidden rounded-[22px] bg-[#f5f5f5]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-body text-base font-semibold">{product.name}</h3>
                      <span className="font-body text-sm font-semibold">${product.price}</span>
                    </div>
                    <p className="font-body mt-2 text-sm leading-6 text-[#666666]">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
