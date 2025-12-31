import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Instagram, ShoppingCart, User } from 'lucide-react';
import Logo from '../components/Logo';

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroImages = [
    {
      image: 'https://images.unsplash.com/photo-1621273898131-70fc7f767ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHBvcnRyYWl0JTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjY5NjI4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      collection: 'PORTRAITS',
      number: '001',
    },
    {
      image: 'https://images.unsplash.com/photo-1652780241487-f396513216ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29keSUyMGxhbmRzY2FwZSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2Njk2MjE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      collection: 'NATURE',
      number: '002',
    },
    {
      image: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2Njk0ODg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      collection: 'CITY',
      number: '003',
    },
    {
      image: 'https://images.unsplash.com/photo-1602128110234-2d11c0aaadfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NjkwMzQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      collection: 'ABSTRACT',
      number: '004',
    },
  ];

  const currentHero = heroImages[currentHeroIndex];

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Main Hero Section - Editorial Cover Style */}
      <section className="relative h-screen flex items-center justify-center px-0 md:px-8 lg:px-12 py-0 md:py-12">
        {/* Center Poster Frame */}
        <div className="relative w-full h-full md:max-w-[1200px] md:aspect-[2/1] md:h-auto overflow-hidden">
          {/* Hero Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url(${currentHero.image})`,
              backgroundPosition: 'center 40%',
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          </div>

          {/* Micro UI - Top Right */}
          <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20 flex gap-3 md:gap-4">
            <Link to="/account" className="text-white/70 hover:text-[#EEFF00] transition-colors">
              <User className="w-5 h-5 md:w-5 md:h-5" />
            </Link>
            <Link to="/cart" className="text-white/70 hover:text-[#EEFF00] transition-colors">
              <ShoppingCart className="w-5 h-5 md:w-5 md:h-5" />
            </Link>
          </div>

          {/* Mid Right - Small Label */}
          <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 hidden lg:block">
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] writing-mode-vertical font-mono">
              Limited Drops
            </p>
          </div>

          {/* Large Title - Bottom Left */}
          <div className="absolute bottom-24 md:bottom-24 lg:bottom-32 left-4 md:left-8 right-4 md:right-auto z-20 max-w-xl">
            <div className="mb-6 md:mb-6">
              <Logo className="h-24 md:h-28 lg:h-32" color="#EEFF00" />
            </div>
            <p className="text-white/80 text-sm md:text-sm uppercase tracking-[0.3em] font-mono mb-8 md:mb-8">
              Fine Art Canvas Prints
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                to="/shop"
                className="inline-block text-center px-8 md:px-8 py-4 md:py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm md:text-sm hover:bg-[#EEFF00]/90 transition-all"
              >
                Shop Prints
              </Link>
              <Link
                to="/shop"
                className="inline-block text-center px-8 md:px-8 py-4 md:py-4 border-2 border-white/80 text-white uppercase tracking-wider text-sm md:text-sm hover:bg-white hover:text-black transition-all"
              >
                Browse Gallery
              </Link>
            </div>
          </div>

          {/* Bottom Left - Index & Instagram */}
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20 flex items-center gap-4">
            <span className="text-[#EEFF00] text-sm md:text-sm font-mono">{currentHero.number}</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#EEFF00] transition-colors"
            >
              <Instagram className="w-5 h-5 md:w-5 md:h-5" />
            </a>
          </div>

          {/* Bottom Center - Collection Switcher */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 md:gap-4">
            <button
              onClick={prevHero}
              className="text-white/70 hover:text-[#EEFF00] transition-colors"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-5 h-5 md:w-5 md:h-5" />
            </button>
            <span className="text-white/90 text-xs md:text-sm uppercase tracking-[0.3em] font-mono min-w-[100px] md:min-w-[140px] text-center">
              {currentHero.collection}
            </span>
            <button
              onClick={nextHero}
              className="text-white/70 hover:text-[#EEFF00] transition-colors"
              aria-label="Next collection"
            >
              <ChevronRight className="w-5 h-5 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Bottom Right - Secondary CTA */}
          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 hidden md:block">
            <Link
              to="/contact"
              className="inline-block px-6 py-3 border border-white/50 text-white text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Say Hi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}