'use client';

import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import FeaturedProducts from '@/sections/FeaturedProducts';
import Collection from '@/sections/Collection';
import Products from '@/sections/Products';
import PromoCards from '@/sections/PromoCards';
import Categories from '@/sections/Categories';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Testimonials from '@/sections/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <FeaturedProducts />
        <Collection />
        <Products />
        <PromoCards />
        <Categories />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
