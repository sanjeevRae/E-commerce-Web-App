import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-3 pb-20 md:px-4">
      <h2 className="font-body mb-8 text-3xl font-semibold text-[#111111]">Categories</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map(category => (
          <article key={category.name} className="group relative aspect-[16/10] min-h-[230px] overflow-hidden bg-[#eeeeee] md:min-h-[280px]">
            <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />
            <ArrowUpRight className="absolute right-5 top-5 text-white" size={30} strokeWidth={1.4} />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-16 text-center text-white">
              <h3 className="font-body mx-auto max-w-[90%] break-words text-xl font-normal leading-tight sm:text-2xl">{category.name}</h3>
              <p className="mt-1 text-sm leading-none text-white/82">{category.stock} Stock</p>
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
