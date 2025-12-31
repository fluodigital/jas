import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Heart, X } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../../context/AppContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, toggleWishlist } = useApp();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filters from URL
  const collectionFilter = searchParams.get('collection') || null;
  const orientationFilter = searchParams.get('orientation') || null;
  const sortBy = searchParams.get('sort') || 'featured';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '999');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (collectionFilter) {
      filtered = filtered.filter(p => p.collections.includes(collectionFilter.toLowerCase()));
    }

    if (orientationFilter) {
      filtered = filtered.filter(p => p.orientation === orientationFilter);
    }

    filtered = filtered.filter(p => p.basePrice >= minPrice && p.basePrice <= maxPrice);

    // Sort
    switch (sortBy) {
      case 'newest':
        break;
      case 'price-low':
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [collectionFilter, orientationFilter, sortBy, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-white text-3xl lg:text-5xl mb-4 uppercase tracking-wider">Shop All Prints</h1>
          <p className="text-white/60 text-sm uppercase tracking-[0.2em]">
            <span className="text-[#EEFF00]">[</span> {filteredProducts.length} <span className="text-[#EEFF00]">]</span> prints
          </p>
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-white text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Filter size={18} />
                Filters
              </h3>

              {/* Collection */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h4 className="text-white/80 text-xs uppercase tracking-wider mb-4">Collection</h4>
                <div className="space-y-3">
                  {(['Nature', 'City', 'Abstract', 'Portraits']).map(coll => (
                    <label key={coll} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="collection"
                        checked={collectionFilter === coll}
                        onChange={() => updateFilter('collection', coll)}
                        className="w-4 h-4 accent-[#EEFF00]"
                      />
                      <span className="text-sm text-white/70 group-hover:text-[#EEFF00] transition-colors">{coll}</span>
                    </label>
                  ))}
                  {collectionFilter && (
                    <button
                      onClick={() => updateFilter('collection', null)}
                      className="text-xs text-white/50 hover:text-[#EEFF00] underline uppercase tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Orientation */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h4 className="text-white/80 text-xs uppercase tracking-wider mb-4">Orientation</h4>
                <div className="space-y-3">
                  {(['portrait', 'landscape', 'square']).map(orient => (
                    <label key={orient} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="orientation"
                        checked={orientationFilter === orient}
                        onChange={() => updateFilter('orientation', orient)}
                        className="w-4 h-4 accent-[#EEFF00]"
                      />
                      <span className="text-sm text-white/70 group-hover:text-[#EEFF00] transition-colors capitalize">{orient}</span>
                    </label>
                  ))}
                  {orientationFilter && (
                    <button
                      onClick={() => updateFilter('orientation', null)}
                      className="text-xs text-white/50 hover:text-[#EEFF00] underline uppercase tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-white/80 text-xs uppercase tracking-wider mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Min Price (£)</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      className="w-full mt-2 px-3 py-2 bg-white/5 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#EEFF00] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider">Max Price (£)</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className="w-full mt-2 px-3 py-2 bg-white/5 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#EEFF00] text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Mobile Filter */}
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm text-white hover:bg-white/10 transition-colors"
              >
                <SlidersHorizontal size={18} />
                <span className="text-sm uppercase tracking-wider">Filters</span>
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <label htmlFor="sort" className="text-xs text-white/60 uppercase tracking-wider">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#EEFF00] text-white text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {mobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/95 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white text-xl uppercase tracking-wider">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-white/80 hover:text-[#EEFF00]">
                      <X size={24} />
                    </button>
                  </div>

                  {/* Same filter content as desktop */}
                  <div className="space-y-8">
                    {/* Collection */}
                    <div>
                      <h4 className="text-white/80 text-xs uppercase tracking-wider mb-4">Collection</h4>
                      <div className="space-y-3">
                        {(['Nature', 'City', 'Abstract', 'Portraits']).map(coll => (
                          <label key={coll} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="collection-mobile"
                              checked={collectionFilter === coll}
                              onChange={() => updateFilter('collection', coll)}
                              className="w-4 h-4 accent-[#EEFF00]"
                            />
                            <span className="text-sm text-white/70">{coll}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full px-6 py-3 bg-[#EEFF00] text-black uppercase tracking-wider text-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/60 mb-4">No prints found matching your criteria</p>
                <button
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="text-[#EEFF00] underline uppercase tracking-wider text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group relative">
                    <Link to={`/product/${product.slug}`} className="block aspect-[4/5] overflow-hidden bg-neutral-900 mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors backdrop-blur-sm"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={18}
                        className={wishlist.includes(product.id) ? 'fill-[#EEFF00] text-[#EEFF00]' : 'text-white'}
                      />
                    </button>
                    <Link to={`/product/${product.slug}`} className="block">
                      <h3 className="text-white text-base mb-2 group-hover:text-[#EEFF00] transition-colors">{product.title}</h3>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">{product.collections.join(', ')}</p>
                      <p className="text-white/80 text-sm">From £{product.basePrice}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
