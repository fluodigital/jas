import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4 py-16">
      <div className="max-w-screen-md w-full text-center">
        <CheckCircle size={64} className="mx-auto mb-6 text-[#EEFF00]" />
        <h1 className="text-3xl lg:text-4xl mb-4 text-white uppercase tracking-wider">Order Confirmed!</h1>
        <p className="text-white/60 mb-2">Thank you for your purchase</p>
        <p className="text-lg mb-8 text-white/80 font-mono">Order #{orderId}</p>

        <div className="bg-black border border-white/10 p-8 mb-8 text-left">
          <h2 className="text-lg mb-6 text-white uppercase tracking-wider">What happens next?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEFF00] flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-black" />
              </div>
              <div>
                <h3 className="mb-1 text-white">Order Processing</h3>
                <p className="text-sm text-white/60">We'll prepare your canvas prints with care</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEFF00] flex items-center justify-center flex-shrink-0">
                <Truck size={20} className="text-black" />
              </div>
              <div>
                <h3 className="mb-1 text-white">Shipping</h3>
                <p className="text-sm text-white/60">You'll receive tracking information via email</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEFF00] flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-black" />
              </div>
              <div>
                <h3 className="mb-1 text-white">Delivery</h3>
                <p className="text-sm text-white/60">Your order will arrive within 5-7 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="px-8 py-3 border border-white/50 text-white uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account/orders"
            className="px-8 py-3 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}