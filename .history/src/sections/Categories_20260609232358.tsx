import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-3 pb-16 sm:px-4 sm:pb-20 md:px-4">
      <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
        <h2 className="font-body text-2xl font-semibold text-[#111111] sm:text-3xl">Categories</h2>
        <p className="max-w-[140px] text-right text-[11px] leading-4 text-[#777777] sm:max-w-none sm:text-sm">
          Explore curated styles for every mood.
        </p>
      </div>
      <<div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2">
  {categories.map(category => (
    <article
      key={category.name}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#eeeeee] sm:aspect-[16/10]"
    >
      {/* Image covers the entire article – no gaps */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Text overlay with gradient background – no large empty padding */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-6 text-center text-white sm:px-5 sm:pb-6 sm:pt-8">
        <h3 className="font-body mx-auto max-w-[92%] text-sm font-medium leading-tight sm:max-w-[90%] sm:text-xl sm:font-normal md:text-2xl">
          {category.name}
        </h3>
        <p className="mt-1 text-[11px] leading-none text-white/82 sm:text-sm">
          {category.stock} Stock
        </p>
      </div>
    </article>
  ))}
</div>
      <div className="mt-7 text-center sm:mt-9">
        <button className="rounded-full bg-[#111111] px-5 py-2.5 text-xs font-medium text-white sm:px-6 sm:py-3">View All Categories</button>
      </div>
    </section>
  );
}
