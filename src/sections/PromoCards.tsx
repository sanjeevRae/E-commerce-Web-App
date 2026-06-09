import { ArrowUpRight } from 'lucide-react';

const promos = [
  { title: 'Vibe Check!', description: "Get ready for the season's hottest K-style. Your everyday look, amplified.", image: '/promo_01.jpg' },
  { title: 'Express Your K-Street Style', description: 'Level up your looks. Find pieces that make you stand out.', image: '/promo_02.jpg' },
];

export default function PromoCards() {
  return (
    <section className="bg-white px-1 py-14 md:px-2">
      <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
        {promos.map(promo => (
          <article key={promo.title} className="group relative min-h-[230px] overflow-hidden bg-[#eeeeee] md:min-h-[310px]">
            <img src={promo.image} alt={promo.title} className="absolute inset-0 !h-full !w-full max-w-none object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <ArrowUpRight className="absolute right-5 top-5 text-white" size={28} strokeWidth={1.4} />
            <div className="absolute bottom-7 left-5 max-w-md text-white md:left-7">
              <h3 className="font-body mb-2 text-2xl font-normal">{promo.title}</h3>
              <p className="text-sm leading-relaxed text-white/85 md:text-base">{promo.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
