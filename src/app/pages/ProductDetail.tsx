import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '../../data/products';
import { useApp } from '../../context/AppContext';
import { CartItem, FrameStyle } from '../../types';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useApp();

  const product = products.find(p => p.slug === slug);
  const [selectedSizeId, setSelectedSizeId] = useState(product?.sizes[0].id || '');
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('none');
  const [giftWrap, setGiftWrap] = useState(false);
  const [signedByArtist, setSignedByArtist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-600 mb-4">Product not found</p>
        <Link to="/shop" className="text-neutral-900 underline">Return to shop</Link>
      </div>
    );
  }

  const selectedSize = product.sizes.find(s => s.id === selectedSizeId);
  const framePrice = frameStyle === 'none' ? 0 : frameStyle === 'black' ? 29 : 39;
  const giftWrapPrice = giftWrap ? 5 : 0;
  const signedPrice = signedByArtist ? 15 : 0;
  const totalPrice = (selectedSize?.price || 0) + framePrice + giftWrapPrice + signedPrice;

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem: CartItem = {
      productId: product.id,
      product,
      sizeId: selectedSize.id,
      size: selectedSize,
      frameStyle,
      giftWrap,
      signedByArtist,
      quantity,
      price: totalPrice,
    };

    addToCart(cartItem);
    toast.success('Added to cart');
  };

  const relatedProducts = products.filter(p => 
    p.id !== product.id && 
    p.collection.some(c => product.collection.includes(c))
  ).slice(0, 4);

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Link to="/" className="hover:text-[#EEFF00]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#EEFF00]">Shop</Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-[#EEFF00] mb-6"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-[4/3] lg:aspect-square bg-neutral-100 rounded-sm overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl mb-2 text-white">{product.title}</h1>
              <p className="text-white/60">{product.collection.join(' • ')}</p>
            </div>

            <p className="text-white/70 mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm mb-3 text-white">Select Size</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`px-4 py-3 border rounded-sm transition-colors ${
                      selectedSizeId === size.id
                        ? 'border-[#EEFF00] bg-[#EEFF00] text-black'
                        : 'border-white/20 hover:border-white/40 text-white'
                    }`}
                  >
                    <div className="text-sm">{size.label}</div>
                    <div className="text-xs mt-1 opacity-70">£{size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Style */}
            <div className="mb-6">
              <h3 className="text-sm mb-3 text-white">Frame Style <span className="text-white/50">(Optional)</span></h3>
              <div className="grid grid-cols-3 gap-3">
                {(['none', 'black', 'white'] as FrameStyle[]).map(style => (
                  <button
                    key={style}
                    onClick={() => setFrameStyle(style)}
                    className={`px-4 py-3 border rounded-sm capitalize transition-colors ${
                      frameStyle === style
                        ? 'border-[#EEFF00] bg-[#EEFF00] text-black'
                        : 'border-white/20 hover:border-white/40 text-white'
                    }`}
                  >
                    {style}
                    {style !== 'none' && <div className="text-xs mt-1 opacity-70">+£{style === 'black' ? 29 : 39}</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-white">Gift wrap <span className="text-white/50">(+£5)</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={signedByArtist}
                  onChange={(e) => setSignedByArtist(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-white">Signed by Jas <span className="text-white/50">(+£15)</span></span>
              </label>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm mb-3 text-white">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-white/20 rounded-sm hover:border-white/40 text-white"
                >
                  −
                </button>
                <span className="text-lg w-12 text-center text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-white/20 rounded-sm hover:border-white/40 text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="border-t border-white/10 pt-6 mb-6">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-sm text-white/60">Total</span>
                <span className="text-3xl text-white">£{totalPrice}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-[#EEFF00] text-black rounded-sm hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="px-4 py-4 border border-white/20 rounded-sm hover:border-white/40 transition-colors text-white"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} className={wishlist.includes(product.id) ? 'fill-[#EEFF00] text-[#EEFF00]' : ''} />
                </button>
              </div>

              <p className="text-sm text-white/60 mt-4">
                <Truck size={16} className="inline mr-2" />
                Free UK delivery on orders over £100
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-3">
                <Shield size={18} className="mt-0.5 flex-shrink-0" />
                <p>Premium museum-quality canvas with archival inks</p>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={18} className="mt-0.5 flex-shrink-0" />
                <p>30-day returns for peace of mind</p>
              </div>
            </div>

            {/* Metadata */}
            {product.metadata && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-sm mb-4 text-white">Details</h3>
                <dl className="space-y-2 text-sm">
                  {product.metadata.location && (
                    <div className="flex gap-4">
                      <dt className="text-white/60 w-24">Location</dt>
                      <dd className="text-white">{product.metadata.location}</dd>
                    </div>
                  )}
                  {product.metadata.dateTaken && (
                    <div className="flex gap-4">
                      <dt className="text-white/60 w-24">Date</dt>
                      <dd className="text-white">{product.metadata.dateTaken}</dd>
                    </div>
                  )}
                  {product.metadata.camera && (
                    <div className="flex gap-4">
                      <dt className="text-white/60 w-24">Camera</dt>
                      <dd className="text-white">{product.metadata.camera}</dd>
                    </div>
                  )}
                  {product.metadata.lens && (
                    <div className="flex gap-4">
                      <dt className="text-white/60 w-24">Lens</dt>
                      <dd className="text-white">{product.metadata.lens}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-neutral-50 py-16">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <Link
                  key={related.id}
                  to={`/product/${related.slug}`}
                  className="group bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={related.images[0]}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm mb-1">{related.title}</h3>
                    <p className="text-neutral-900 text-sm">From £{related.basePrice}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}