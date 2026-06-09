'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories } from '@/data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.category-title',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="categories" className="section-padding bg-[#F6F6F2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="category-title font-serif text-3xl md:text-4xl font-semibold text-[#111111] mb-8">
          Categories
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              className="category-card relative rounded-[24px] overflow-hidden aspect-[16/10] group cursor-pointer bg-[#EDECE8]"
              initial={{ opacity: 0, y: 70, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={14} className="text-white" />
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="text-white font-medium text-base md:text-lg">{cat.name}</h3>
                <p className="text-white/70 text-xs md:text-sm">{cat.stock} Stock</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="btn-primary">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
