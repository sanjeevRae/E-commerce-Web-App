'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[500px] overflow-hidden bg-[#111111] md:h-[640px]">
      <img src="/hero_collage_01.jpg" alt="K-fashion editorial" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/35 to-transparent" />
      <div className="absolute bottom-10 left-5 max-w-[560px] text-white md:bottom-16 md:left-10">
        <h1 className="font-body mb-4 text-[34px] font-normal leading-[1.03] md:text-[44px]">
          Unleash Your Best Look with K-Fashion Signatures
        </h1>
        <p className="mb-6 max-w-[390px] text-sm leading-relaxed text-white/84 md:text-base">
          Do not just follow the trend, lead it. Shop K-Fashion now and define your best look.
        </p>
        <div className="flex gap-3">
          <Link href="/main-product" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#111111]">
            Shop Now <ArrowRight size={14} />
          </Link>
          <a href="#collection" className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2.5 text-xs font-medium text-white">
            Learn More <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
