import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useApp();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
          <ShoppingBag size={48} className="mx-auto mb-6 text-white/40" />
          <h2 className="text-white text-2xl lg:text-3xl mb-4 uppercase tracking-wider">Your cart is empty</h2>
          <p className="text-white/60 mb-8 text-sm">Add some beautiful prints to get started</p>
          <Link
            to="/shop"
            className="inline-flex px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
          >
            Shop Prints
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-white text-3xl lg:text-5xl mb-8 lg:mb-12 uppercase tracking-wider">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.sizeId}`} className="flex gap-4 pb-6 border-b border-white/10">
                <Link to={`/product/${item.product.slug}`} className="w-32 h-32 flex-shrink-0 bg-neutral-900 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <Link to={`/product/${item.product.slug}`} className="hover:text-[#EEFF00] transition-colors">
                      <h3 className="text-white text-lg">{item.product.title}</h3>
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.productId, item.sizeId)}
                      className="p-1 hover:bg-white/10 text-white/60 hover:text-[#EEFF00] transition-colors"
                      aria-label="Remove"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="text-sm text-white/60 space-y-1 mb-4">
                    <p>Size: {item.size.label}</p>
                    {item.frameStyle !== 'none' && <p>Frame: {item.frameStyle}</p>}
                    {item.giftWrap && <p>Gift wrap included</p>}
                    {item.signedByArtist && <p>Signed by artist</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartItemQuantity(item.productId, item.sizeId, item.quantity - 1)}
                        className="p-2 border border-white/20 text-white/80 hover:border-[#EEFF00] hover:text-[#EEFF00] transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item.productId, item.sizeId, item.quantity + 1)}
                        className="p-2 border border-white/20 text-white/80 hover:border-[#EEFF00] hover:text-[#EEFF00] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="text-white text-lg">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex text-sm text-white/60 hover:text-[#EEFF00] underline uppercase tracking-wider"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/5 border border-white/10 p-6 lg:p-8">
              <h2 className="text-white text-xl mb-6 uppercase tracking-wider">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-white/50">
                    Spend £{(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between mb-8">
                <span className="text-white text-lg uppercase tracking-wider">Total</span>
                <span className="text-[#EEFF00] text-2xl">£{total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <div className="text-xs text-white/50 space-y-2">
                <p>✓ Secure checkout</p>
                <p>✓ 30-day returns</p>
                <p>✓ Free UK shipping over £100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
