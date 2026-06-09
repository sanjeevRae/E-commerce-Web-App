import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-3 pb-16 sm:px-4 sm:pb-20 md:px-4">
      <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#8a8a8a] sm:text-xs">Shop by edit</p>
          <h2 className="font-body text-2xl font-semibold leading-none text-[#111111] sm:text-3xl">Categories</h2>
        </div>
        <p className="max-w-[128px] text-right text-[10px] leading-4 text-[#777777] sm:max-w-none sm:text-sm">
          Discover signature styles picked for everyday wear.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2">
        {categories.map(category => (
          <article key={category.name} className="group relative aspect-[0.78] overflow-hidden rounded-[22px] bg-[#eeeeee] shadow-[0_10px_30px_rgba(17,17,17,0.08)] sm:aspect-[16/10] sm:min-h-[230px] md:min-h-[280px]">
            <img src={category.image} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/24 to-transparent" />
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/12 backdrop-blur-md sm:right-5 sm:top-5 sm:h-10 sm:w-10">
              <ArrowUpRight className="text-white" size={16} strokeWidth={1.8} />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:px-5 sm:pb-6 sm:pt-16">
              <div className="rounded-2xl bg-white/10 px-3 py-2.5 backdrop-blur-sm sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-0">
                <h3 className="font-body text-[15px] font-medium leading-tight sm:max-w-[90%] sm:text-xl sm:font-normal md:text-2xl">{category.name}</h3>
                <p className="mt-1 text-[11px] font-medium tracking-[0.08em] text-white/80 uppercase sm:text-sm sm:normal-case sm:tracking-normal">{category.stock} Stock</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-7 text-center sm:mt-9">
        <button className="rounded-full bg-[#111111] px-5 py-2.5 text-xs font-medium text-white shadow-[0_10px_24px_rgba(17,17,17,0.14)] transition hover:bg-[#222222] sm:px-6 sm:py-3">View All Categories</button>
      </div>
    </section>
  );
}
