'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, Search, ShoppingCart, UserCircle, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [activeCategoryMenu, setActiveCategoryMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState('22h37m54s');
  const { totalItems, setIsCartOpen } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const categoryMenus: Record<string, string[]> = {
    Best: ['Top Selling Men', 'Top Selling Women', 'Top Selling Kids', 'Most Loved Products'],
    Men: ['T-Shirts', 'Shirts', 'Polo Shirts', 'Jeans', 'Pants & Trousers', 'Shorts', 'Hoodies & Sweatshirts', 'Jackets', 'Coats', 'Blazers', 'Suits'],
    Women: ['Tops', 'T-Shirts', 'Shirts & Blouses', 'Dresses', 'Skirts', 'Jeans', 'Pants & Trousers', 'Leggings', 'Hoodies & Sweatshirts', 'Jackets'],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setIsShopOpen(false);
      setActiveCategoryMenu(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saleEndsAt = Date.now() + (22 * 60 * 60 + 37 * 60 + 54) * 1000;

    const updateCountdown = () => {
      const timeLeft = Math.max(0, saleEndsAt - Date.now());
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setCountdown(`${hours}h${String(minutes).padStart(2, '0')}m${String(seconds).padStart(2, '0')}s`);
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return products.slice(0, 5);
    }

    return products.filter(product =>
      [product.name, product.category, product.description].some(value => value.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const openSearch = () => {
    setIsMobileMenuOpen(false);
    setIsShopOpen(false);
    setActiveCategoryMenu(null);
    setIsSearchOpen(true);
  };

  const openProduct = (productId: string) => {
    closeSearch();
    router.push(`/product/${productId}`);
  };

  return (
    <>
      {isHome && (
        <div className={`bg-[#1d1d1d] py-2 text-center text-white transition-transform duration-300 ${isScrolled && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}>
          <span className="text-xs sm:text-sm">
            Get 50% Off This Summer Sale. Grab It Fast! <strong>{countdown}</strong>
          </span>
        </div>
      )}

      <header className={`z-40 bg-white/95 backdrop-blur ${isHome ? '' : ''} border-b border-[#ececec]`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(current => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5]"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <Link href="/" className="font-serif text-2xl font-semibold text-[#111111]">
            ChitraTech Shop
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setActiveCategoryMenu(null);
                  setIsShopOpen(current => !current);
                }}
                className="flex items-center gap-1 text-xs font-medium text-[#111111]"
              >
                Latest Collection <ChevronDown size={13} />
              </button>

              {isShopOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-56 rounded-xl border border-[#dedede] bg-white py-2 shadow-lg">
                  {['New This Week', 'New This Month', 'Trending New Products'].map(item => (
                    <button
                      key={item}
                      onClick={() => {
                        setIsShopOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-xs text-[#111111] hover:bg-[#f5f5f5]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {['Best', 'Men', 'Women'].map(item => (
              <div key={item} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => {
                    setIsShopOpen(false);
                    setActiveCategoryMenu(current => (current === item ? null : item));
                  }}
                  className="flex items-center gap-1 text-xs font-medium text-[#111111]"
                >
                  {item} <ChevronDown size={13} />
                </button>
                {activeCategoryMenu === item && (
                  <div className="absolute left-0 top-full z-50 mt-3 w-[420px] rounded-xl border border-[#dedede] bg-white p-4 shadow-lg">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {categoryMenus[item].map(menuItem => (
                        <button
                          key={menuItem}
                          onClick={() => {
                            setActiveCategoryMenu(null);
                          }}
                          className="text-left text-sm text-[#111111] transition-colors hover:text-[#8f1f35]"
                        >
                          {menuItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={openSearch}
              className="hidden items-center gap-2 p-1 text-xs font-medium text-[#111111] md:inline-flex"
            >
              <Search size={15} strokeWidth={1.8} />
              Search
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden items-center gap-2 p-1 text-xs font-medium text-[#111111] md:flex"
              aria-label="Cart"
            >
              <ShoppingCart size={16} strokeWidth={1.8} />
              <span>({totalItems})</span>
            </button>
            <button className="hidden items-center gap-2 p-1 text-xs font-medium text-[#111111] md:flex">
              <UserCircle size={22} strokeWidth={1.5} />
              Bhuwan Bhatt
            </button>
            <button onClick={openSearch} className="md:hidden" aria-label="Search">
              <Search size={18} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative md:hidden" aria-label="Cart">
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111111] px-1 text-[10px] text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="border-t border-[#ececec] bg-white px-4 py-4 md:hidden">
            <div className="space-y-3">
              <button className="block text-left text-sm text-[#111111]">Latest Collection</button>
              {['Best', 'Men', 'Women'].map(item => (
                <button key={item} className="block text-left text-sm text-[#111111]">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 p-0 backdrop-blur-[2px]" onClick={closeSearch}>
          <div
            className="mx-auto mt-16 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#ececec] px-4 py-4 sm:px-5">
              <Search size={18} className="text-[#777777]" strokeWidth={1.7} />
              <input
                autoFocus
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search products, categories, styles..."
                className="h-10 flex-1 border-0 bg-transparent text-sm text-[#111111] outline-none placeholder:text-[#999999]"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f5] text-[#111111]"
                aria-label="Close search"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#777777]">
                  {searchQuery.trim() ? 'Search results' : 'Popular picks'}
                </p>
                <span className="text-xs text-[#999999]">{searchResults.length} items</span>
              </div>

              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map(product => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => openProduct(product.id)}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-[#f8f8f8]"
                    >
                      <img src={product.image} alt={product.name} className="h-14 w-14 rounded-2xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-body text-sm font-semibold text-[#111111]">{product.name}</p>
                        <p className="mt-1 truncate font-body text-xs text-[#777777]">{product.category} · {product.description}</p>
                      </div>
                      <span className="font-body text-sm font-semibold text-[#111111]">${product.price}</span>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl bg-[#fafafa] px-4 py-8 text-center">
                    <p className="font-body text-sm font-medium text-[#111111]">No products found</p>
                    <p className="mt-1 font-body text-xs text-[#777777]">Try a different keyword, category, or style.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
