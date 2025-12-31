import { Camera, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function About() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <div className="flex justify-center mb-6">
          <Logo className="h-16 lg:h-20" color="#fff" />
        </div>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Capturing the world's beauty through my lens and bringing it to your walls
        </p>
      </div>

      {/* Story */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] bg-neutral-900 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1654738344031-441757e8818d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjY5NjA3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Photographer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-white text-3xl lg:text-4xl mb-6 uppercase tracking-wider">My Journey</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Photography has been my passion for over a decade. What started as a hobby during weekend walks has evolved into a full-time pursuit of capturing the world's most beautiful moments.
              </p>
              <p>
                I specialise in landscape, urban, and abstract photography, always seeking to find unique perspectives and lighting that transform ordinary scenes into extraordinary art.
              </p>
              <p>
                Each print in my collection represents a moment that moved me, and I'm thrilled to share these captured memories with you, bringing beauty and inspiration into your space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-black border-y border-white/10 py-16 lg:py-24">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-3xl lg:text-4xl text-center mb-12 uppercase tracking-wider">Why Canvas Prints</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#EEFF00] mx-auto mb-6 flex items-center justify-center">
                <Award size={28} className="text-black" />
              </div>
              <h3 className="text-white text-lg mb-3 uppercase tracking-wider">Premium Quality</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Museum-grade canvas with archival inks that last for generations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#EEFF00] mx-auto mb-6 flex items-center justify-center">
                <Camera size={28} className="text-black" />
              </div>
              <h3 className="text-white text-lg mb-3 uppercase tracking-wider">Artistic Vision</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Each photograph is carefully composed and edited to perfection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#EEFF00] mx-auto mb-6 flex items-center justify-center">
                <Heart size={28} className="text-black" />
              </div>
              <h3 className="text-white text-lg mb-3 uppercase tracking-wider">Made with Care</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Every print is handcrafted and inspected before shipping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h2 className="text-white text-3xl lg:text-4xl mb-4 uppercase tracking-wider">Start Your Collection</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          Browse my curated collections and find the perfect piece for your space
        </p>
        <Link
          to="/shop"
          className="inline-flex px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
        >
          View All Prints
        </Link>
      </div>
    </div>
  );
}