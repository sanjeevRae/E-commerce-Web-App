'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '@/data/products';

type CartItem = Product & {
  quantity: number;
  selectedSize?: string;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity = 1, selectedSize?: string) => {
    setItems(current => {
      const existingIndex = current.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize,
      );

      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...current, { ...product, quantity, selectedSize }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, selectedSize?: string) => {
    setItems(current =>
      current.filter(item => !(item.id === productId && item.selectedSize === selectedSize)),
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setItems(current =>
      current.map(item =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
        : item,
      ),
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
