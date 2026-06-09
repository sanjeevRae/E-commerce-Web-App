import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-3 pb-14 sm:px-4 sm:pb-20 md:px-4">
      <div className="mb-5">
        <h2 className="font-body text-2xl font-semibold text-[#111111] sm:text-3xl">Categories</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2">
        {categories.map(category => (
          <article key={category.name} className="group relative aspect-square overflow-hidden rounded-2xl bg-[#eeeeee] sm:aspect-[16/10] sm:min-h-[130px] md:min-h-[180px]">
            <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2 text-center text-white sm:px-5 sm:pb-4">
              <h3 className="font-body mx-auto max-w-full text-sm font-medium leading-tight sm:max-w-[90%] sm:text-xl sm:font-normal md:text-2xl">{category.name}</h3>
              <p className="mt-0.5 text-[11px] leading-none text-white/82 sm:mt-1 sm:text-sm">{category.stock} Stock</p>
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
