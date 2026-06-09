'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { filterCategories, products } from '@/data/products';

export default function FeaturedProducts() {
  return (
    <section id="featured" className="bg-white px-3 py-12 sm:px-4 md:px-6 lg:px-10">
      <div className="mb-6 flex items-center justify-between gap-3 sm:mb-7">
        <h2 className="font-body text-xl font-semibold text-[#111111] sm:text-2xl">Featured Now</h2>
        <div className="flex gap-2">
          <button className="icon-button h-8 w-8 rounded-full border border-[#dedede] sm:h-9 sm:w-9" aria-label="Previous featured products"><ChevronLeft size={16} /></button>
          <button className="icon-button h-8 w-8 rounded-full border border-[#dedede] sm:h-9 sm:w-9" aria-label="Next featured products"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="mb-7 flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:mb-9 sm:flex-wrap sm:overflow-visible">
        {filterCategories.map((category, index) => (
          <button key={category} className={`shrink-0 rounded-full border px-4 py-2 text-[11px] sm:px-5 sm:text-xs ${index === 0 ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#dedede] bg-white text-[#111111]'}`}>
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-5 lg:grid-cols-4">
        {products.slice(0, 4).map(product => (
          <Link key={product.id} href={`/product/${product.id}`} className="group min-w-0 text-left">
            <div className="mb-3 aspect-[4/5] overflow-hidden rounded-xl bg-[#f1f1f1]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <p className="mb-1 truncate text-[10px] text-[#777777] sm:text-[11px]">{product.category}</p>
            <h3 className="min-h-[38px] text-[13px] font-medium leading-tight text-[#111111] sm:min-h-[42px] sm:text-sm">{product.name}</h3>
            <p className="mt-2 text-[13px] font-medium text-[#111111] sm:mt-3 sm:text-sm">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center sm:mt-10">
        <Link href="/main-product" className="inline-flex rounded-full bg-[#111111] px-5 py-2.5 text-xs font-medium text-white sm:px-6 sm:py-3">
          View All Product
        </Link>
      </div>
    </section>
  );
}
