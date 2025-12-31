import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, getCartCount, wishlist } = useApp();
  const location = useLocation();

  const cartCount = getCartCount();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      {/* Header - Editorial Style */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo className="h-8 lg:h-10" color="#EEFF00" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs uppercase tracking-[0.2em] hover:text-[#EEFF00] transition-colors ${
                    location.pathname === link.to ? 'text-[#EEFF00]' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Utility Nav */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/80 hover:text-[#EEFF00]"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to={user ? '/account/wishlist' : '/auth'}
                className="p-2 hover:bg-white/10 rounded-md transition-colors relative text-white/80 hover:text-[#EEFF00]"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EEFF00] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="p-2 hover:bg-white/10 rounded-md transition-colors relative text-white/80 hover:text-[#EEFF00]"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EEFF00] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to={user ? '/account' : '/auth'}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/80 hover:text-[#EEFF00]"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="py-4 border-t border-white/10">
              <input
                type="search"
                placeholder="Search photos..."
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEFF00] text-white placeholder:text-white/40"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-[#000000]">
            {/* Header bar with close button */}
            <div className="flex items-center justify-end h-16 px-4 border-b border-white/10 bg-[#000000]">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Full screen navigation */}
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] px-4 space-y-8 bg-[#000000]">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-2xl text-white/80 hover:text-[#EEFF00] transition-colors uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Additional links at bottom */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-col items-center gap-4 w-full max-w-xs">
                <Link
                  to={user ? '/account' : '/auth'}
                  className="text-sm text-white/60 hover:text-[#EEFF00] uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {user ? 'My Account' : 'Sign In'}
                </Link>
                <Link
                  to="/cart"
                  className="w-full px-6 py-3 bg-[#EEFF00] text-black text-center uppercase tracking-wider text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-6 py-3 border border-white/30 text-white/60 text-center uppercase tracking-wider text-sm hover:bg-white/5 transition-colors"
                >
                  Close Menu
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Editorial Style */}
      <footer className="bg-black border-t border-white/10 mt-auto">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div>
              <Logo className="h-8 mb-4" color="#fff" />
              <p className="text-sm text-white/60 leading-relaxed">
                Fine art photography printed on premium canvas, bringing beauty to your space.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-white/80">Shop</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link to="/shop" className="hover:text-[#EEFF00] transition-colors">All Prints</Link></li>
                <li><Link to="/shop?collection=Nature" className="hover:text-[#EEFF00] transition-colors">Nature</Link></li>
                <li><Link to="/shop?collection=City" className="hover:text-[#EEFF00] transition-colors">City</Link></li>
                <li><Link to="/shop?collection=Abstract" className="hover:text-[#EEFF00] transition-colors">Abstract</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-white/80">Support</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link to="/shipping" className="hover:text-[#EEFF00] transition-colors">Shipping</Link></li>
                <li><Link to="/returns" className="hover:text-[#EEFF00] transition-colors">Returns</Link></li>
                <li><Link to="/faq" className="hover:text-[#EEFF00] transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-[#EEFF00] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-white/80">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link to="/privacy" className="hover:text-[#EEFF00] transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-[#EEFF00] transition-colors">Terms</Link></li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-white/60 hover:text-[#EEFF00] transition-colors text-sm">Instagram</a>
                <a href="#" className="text-white/60 hover:text-[#EEFF00] transition-colors text-sm">Twitter</a>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link to="/admin/login" className="text-xs text-white/40 hover:text-[#EEFF00] transition-colors">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/40 text-center">
            © {new Date().getFullYear()} Jas Soni. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}