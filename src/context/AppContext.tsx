import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, User, PhotoProduct } from '../types';
import { products } from '../data/products';

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, sizeId: string) => void;
  updateCartItemQuantity: (productId: string, sizeId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, fullName: string) => void;
  getProduct: (id: string) => PhotoProduct | undefined;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.sizeId === item.sizeId
      );
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId && i.sizeId === item.sizeId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, sizeId: string) => {
    setCart(prev => prev.filter(
      i => !(i.productId === productId && i.sizeId === sizeId)
    ));
  };

  const updateCartItemQuantity = (productId: string, sizeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, sizeId);
    } else {
      setCart(prev => prev.map(i =>
        i.productId === productId && i.sizeId === sizeId
          ? { ...i, quantity }
          : i
      ));
    }
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const login = (email: string, _password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      email,
      fullName: 'Guest User',
      addresses: [],
      orders: [],
      wishlist,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (email: string, _password: string, fullName: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      fullName,
      addresses: [],
      orders: [],
      wishlist: [],
    };
    setUser(mockUser);
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        user,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        toggleWishlist,
        login,
        logout,
        register,
        getProduct,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
