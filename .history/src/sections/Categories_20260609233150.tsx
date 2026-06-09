import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-3 pb-14 sm:px-4 sm:pb-20 md:px-4">
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-8">
        <h2 className="font-body text-2xl font-semibold text-[#111111] sm:text-3xl">Categories</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2">
        {categories.map(category => (
          <article key={category.name} className="group relative aspect-square overflow-hidden rounded-2xl">
            <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-body truncate text-sm font-medium leading-tight sm:text-xl sm:font-normal md:text-2xl">{category.name}</h3>
                  <p className="mt-1 text-[11px] leading-none text-white/80 sm:text-sm">{category.stock} Stock</p>
                </div>
                <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-white/90 sm:h-5 sm:w-5" strokeWidth={1.7} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 text-center sm:mt-9">
        <button className="rounded-full bg-[#111111] px-5 py-2.5 text-xs font-medium text-white sm:px-6 sm:py-3">View All Categories</button>
      </div>
    </section>
  );
}
