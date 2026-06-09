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

  <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2">
    {categories.map(category => (
      <article 
        key={category.name} 
        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#eeeeee] sm:aspect-[16/10]"
      >
        {/* Image covers entire card */}
        <img 
          src={category.image} 
          alt={category.name} 
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />

        {/* Dark overlay for better text readability (like a semi-transparent black) */}
        <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/20" />

        {/* Arrow icon top-right */}
        <div className="absolute right-3 top-3 rounded-full bg-white/14 p-1.5 backdrop-blur-sm sm:right-5 sm:top-5 sm:p-2">
          <ArrowUpRight className="text-white" size={18} strokeWidth={1.6} />
        </div>

        {/* Text centered like a hero statement – inspired by "Vibe Check!" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h3 className="font-body text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl drop-shadow-lg">
            {category.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-white/90 sm:text-base drop-shadow">
            {category.stock} Stock
          </p>
        </div>
      </article>
    ))}
  </div>

  <div className="mt-7 text-center sm:mt-9">
    <button className="rounded-full bg-[#111111] px-5 py-2.5 text-xs font-medium text-white sm:px-6 sm:py-3">
      View All Categories
    </button>
  </div>
</section>
  );
}
