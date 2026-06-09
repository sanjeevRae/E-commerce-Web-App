'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, MoveUpRight } from 'lucide-react';
import { products } from '@/data/products';

const wrapIndex = (index: number) => ((index % products.length) + products.length) % products.length;
const productSlots = [-3, -2, -1, 0, 1, 2, 3];

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(8);
  const router = useRouter();
  const activeProduct = products[activeIndex];

  const go = (direction: 'prev' | 'next') => setActiveIndex(previous => wrapIndex(direction === 'prev' ? previous - 1 : previous + 1));

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > products.length / 2) offset -= products.length;
    if (offset < -products.length / 2) offset += products.length;
    return offset;
  };

  const getSlotStyle = (offset: number) => {
    const slots: Record<number, { left: string; opacity: number; scale: number; zIndex: number; blur: number; pointerEvents: 'auto' | 'none' }> = {
      [-3]: { left: 'calc(50% - clamp(610px, 43vw, 760px))', opacity: 0.18, scale: 1, zIndex: 2, blur: 0.2, pointerEvents: 'auto' },
      [-2]: { left: 'calc(50% - clamp(430px, 31vw, 540px))', opacity: 0.42, scale: 1, zIndex: 3, blur: 0.1, pointerEvents: 'auto' },
      [-1]: { left: 'calc(50% - clamp(235px, 17vw, 305px))', opacity: 0.5, scale: 1, zIndex: 4, blur: 0, pointerEvents: 'auto' },
      [0]: { left: '50%', opacity: 1, scale: 1, zIndex: 20, blur: 0, pointerEvents: 'none' },
      [1]: { left: 'calc(50% + clamp(315px, 23vw, 400px))', opacity: 0.5, scale: 1, zIndex: 5, blur: 0, pointerEvents: 'auto' },
      [2]: { left: 'calc(50% + clamp(500px, 36vw, 630px))', opacity: 0.4, scale: 1, zIndex: 3, blur: 0.1, pointerEvents: 'auto' },
      [3]: { left: 'calc(50% + clamp(675px, 48vw, 820px))', opacity: 0.18, scale: 1, zIndex: 2, blur: 0.2, pointerEvents: 'auto' },
    };
    return slots[offset];
  };

  const getMobileSlotStyle = (offset: number) => {
    const slots: Record<number, { left: string; opacity: number; scale: number; zIndex: number; pointerEvents: 'auto' | 'none' }> = {
      [-2]: { left: '-8%', opacity: 0, scale: 0.84, zIndex: 1, pointerEvents: 'none' },
      [-1]: { left: '16%', opacity: 0.32, scale: 0.82, zIndex: 4, pointerEvents: 'auto' },
      [0]: { left: '50%', opacity: 1, scale: 1, zIndex: 20, pointerEvents: 'none' },
      [1]: { left: '84%', opacity: 0.32, scale: 0.82, zIndex: 4, pointerEvents: 'auto' },
      [2]: { left: '108%', opacity: 0, scale: 0.84, zIndex: 1, pointerEvents: 'none' },
    };
    return slots[offset];
  };

  return (
    <section id="products" className="overflow-hidden bg-white px-4 py-20 text-center md:px-6 md:py-24 lg:px-10">
      <p className="eyebrow mb-3">Products</p>
      <h2 className="font-body mx-auto mb-6 max-w-[280px] text-2xl font-semibold leading-tight text-[#111111] md:mb-7 md:max-w-none">
        ChitraTech Shop: Our Latest Pieces
      </h2>
      <button className="mb-8 inline-flex items-center gap-2 border border-[#8f1f35] px-4 py-2 text-[11px] text-[#8f1f35] md:mb-12">
        See More Products <MoveUpRight size={13} />
      </button>

      <div className="relative mx-auto h-[440px] max-w-[390px] lg:hidden">
        <div className="absolute inset-x-3 top-8 h-[360px] rounded-[28px] bg-gradient-to-b from-[#fafafa] to-white" />
        {products.map((product, index) => {
          const offset = getOffset(index);
          const activeCard = offset === 0;
          const slot = getMobileSlotStyle(offset);
          if (!(offset >= -2 && offset <= 2) || !slot) return null;
          return (
            <button
              key={product.id}
              onClick={() => setActiveIndex(index)}
              className="absolute top-[52%] m-0 -translate-x-1/2 -translate-y-1/2 appearance-none rounded-none border-0 bg-transparent p-0 leading-none outline-none transition-[left,opacity,transform] duration-700 focus:outline-none focus-visible:outline-none"
              style={{ left: slot.left, zIndex: slot.zIndex, opacity: slot.opacity, transform: `translate(-50%, -50%) scale(${slot.scale})`, pointerEvents: slot.pointerEvents, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`object-contain transition-[height,width,filter,transform] duration-700 ${activeCard ? 'h-[385px] w-[225px]' : 'h-[250px] w-[120px]'}`}
                style={{ filter: activeCard ? 'drop-shadow(0 24px 28px rgba(0,0,0,0.14))' : 'grayscale(0.1)', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-2 max-w-[330px] rounded-[22px] border border-[#eeeeee] bg-white p-5 text-left shadow-[0_20px_55px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold leading-snug text-[#111111]">{activeProduct.name}</h3>
            <p className="mt-1 text-sm font-semibold">${activeProduct.price.toFixed(2)}</p>
          </div>
          <span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-[10px] text-[#6e6e6e]">{activeProduct.category}</span>
        </div>
        <button onClick={() => router.push(`/product/${activeProduct.id}`)} className="w-full rounded-full bg-[#111111] py-3 text-xs font-medium text-white">
          See detail
        </button>
      </div>

      <div className="relative left-1/2 hidden min-h-[500px] w-screen -translate-x-1/2 lg:block">
        <div className="absolute inset-x-0 top-0 h-[430px] overflow-visible">
          {products.map((product, index) => {
            const offset = getOffset(index);
            const activeCard = offset === 0;
            const slot = getSlotStyle(offset);
            if (!productSlots.includes(offset) || !slot) return null;
            return (
              <button
                key={product.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${product.name}`}
                className="absolute bottom-3 m-0 -translate-x-1/2 appearance-none rounded-none border-0 bg-transparent p-0 leading-none outline-none transition-[left,opacity,transform] duration-700 focus:outline-none focus-visible:outline-none"
                style={{ left: slot.left, zIndex: slot.zIndex, opacity: slot.opacity, transform: `translateX(-50%) scale(${slot.scale})`, pointerEvents: slot.pointerEvents, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`object-contain object-bottom transition-[height,width,filter,transform] duration-700 ${
                    activeCard
                      ? 'h-[410px] w-[245px] drop-shadow-[0_24px_32px_rgba(0,0,0,0.10)] xl:h-[430px] xl:w-[260px]'
                      : 'h-[285px] w-[135px] hover:scale-[1.04] xl:h-[300px] xl:w-[145px]'
                  }`}
                  style={{
                    filter: activeCard ? 'drop-shadow(0 18px 20px rgba(0,0,0,0.10))' : `grayscale(0.08) blur(${slot.blur}px)`,
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </button>
            );
          })}
        </div>
        <div className="absolute left-[calc(50%+96px)] top-[185px] z-30 w-[195px] border border-[#d8d8d8] bg-white p-3 text-left shadow-sm xl:left-[calc(50%+108px)]">
          <div className="absolute -left-[58px] top-[17px] h-px w-[68px] origin-right rotate-[42deg] bg-[#9a2b3f]" />
          <h3 className="mb-1 text-[11px] font-semibold leading-snug text-[#111111]">{activeProduct.name}</h3>
          <p className="text-[11px] font-semibold text-[#111111]">${activeProduct.price.toFixed(2)}</p>
          <div className="mt-2 flex gap-1.5">
            {(activeProduct.colors ?? []).slice(0, 3).map(color => (
              <span key={color.name} className="h-3 w-3 border border-[#d8d8d8]" style={{ backgroundColor: color.hex }} title={color.name} />
            ))}
          </div>
          <div className="mt-3">
            <p className="mb-1.5 text-[9px] font-semibold uppercase text-[#111111]">Size</p>
            <div className="grid grid-cols-5 border border-[#dcdcdc]">
              {(activeProduct.sizes ?? ['XS', 'S', 'M', 'L', 'XL']).slice(0, 5).map(size => (
                <span key={size} className="border-r border-[#e6e6e6] py-1 text-center text-[8px] text-[#333333] last:border-r-0">
                  {size}
                </span>
              ))}
            </div>
          </div>
          <button onClick={() => router.push(`/product/${activeProduct.id}`)} className="mt-2 w-full border border-[#111111] py-2 text-[10px] font-medium text-[#111111] transition-colors hover:bg-[#111111] hover:text-white">
            See detail
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4 md:mt-5 md:gap-6">
        <button onClick={() => go('prev')} aria-label="Previous product" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dedede] transition-colors hover:bg-[#111111] hover:text-white"><ArrowLeft size={21} /></button>
        <button onClick={() => go('next')} aria-label="Next product" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dedede] transition-colors hover:bg-[#111111] hover:text-white"><ArrowRight size={21} /></button>
      </div>
    </section>
  );
}
