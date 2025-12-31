import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, SizeVariant, AddOn } from '../data/products';

export interface CartItem {
  product: Product;
  size: SizeVariant;
  addOns: AddOn[];
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: SizeVariant, addOns: AddOn[], quantity: number) => void;
  removeFromCart: (productId: string, sizeName: string) => void;
  updateQuantity: (productId: string, sizeName: string, quantity: number) => void;
  updateCartItem: (productId: string, sizeName: string, newSize: SizeVariant, newAddOns: AddOn[]) => void;
  clearCart: () => void;
  getTotal: () => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: SizeVariant, addOns: AddOn[], quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size.name === size.name);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size.name === size.name
            ? { ...item, quantity: item.quantity + quantity, addOns }
            : item
        );
      }
      return [...prev, { product, size, addOns, quantity }];
    });
  };

  const removeFromCart = (productId: string, sizeName: string) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size.name === sizeName)));
  };

  const updateQuantity = (productId: string, sizeName: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size.name === sizeName
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const updateCartItem = (productId: string, sizeName: string, newSize: SizeVariant, newAddOns: AddOn[]) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size.name === sizeName
          ? { ...item, size: newSize, addOns: newAddOns }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotal = () => items.reduce((total, item) => {
      const sizePrice = item.size.price;
      const addOnsPrice = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
      return total + (sizePrice + addOnsPrice) * item.quantity;
    }, 0);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItem,
        clearCart,
        getTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
