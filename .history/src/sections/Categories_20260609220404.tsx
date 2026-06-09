import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-3 pb-20 md:px-4">
      <h2 className="font-body mb-8 text-3xl font-semibold text-[#111111]">Categories</h2>
      <div className="grid grid-cols-2 gap-0 sm:gap-4 md:grid-cols-2">
        {categories.map(category => (
          <article key={category.name} className="group relative aspect-[4/5] min-h-[180px] overflow-hidden bg-[#eeeeee] sm:aspect-[16/10] sm:min-h-[230px] md:min-h-[280px]">
            <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <ArrowUpRight className="absolute right-3 top-3 text-white sm:right-5 sm:top-5" size={22} strokeWidth={1.4} />
            <div className="absolute inset-x-0 bottom-0 px-2 pb-3 pt-12 text-center text-white sm:px-5 sm:pb-6 sm:pt-16">
              <h3 className="font-body mx-auto max-w-[90%] break-words text-sm font-normal leading-tight sm:text-2xl">{category.name}</h3>
              <p className="mt-1 text-[11px] leading-none text-white/82 sm:text-sm">{category.stock} Stock</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-9 text-center">
        <button className="rounded-full bg-[#111111] px-6 py-3 text-xs font-medium text-white">View All Categories</button>
      </div>
    </section>
  );
}
