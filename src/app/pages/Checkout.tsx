import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../context/AppContext';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingForm {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  phone: string;
  shippingMethod: 'standard' | 'express';
}

interface PaymentForm {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  billingAddressSame: boolean;
}

export default function Checkout() {
  const { cart, getCartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingForm | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentForm | null>(null);

  const { register: registerShipping, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors } } = useForm<ShippingForm>();
  const { register: registerPayment, handleSubmit: handlePaymentSubmit, formState: { errors: _paymentErrors } } = useForm<PaymentForm>();

  const subtotal = getCartTotal();
  const shippingCost = shippingData?.shippingMethod === 'express' ? 9.99 : subtotal > 100 ? 0 : 4.99;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const onShippingSubmit = (data: ShippingForm) => {
    setShippingData(data);
    setStep('payment');
  };

  const onPaymentSubmit = (data: PaymentForm) => {
    setPaymentData(data);
    setStep('review');
  };

  const placeOrder = () => {
    // Mock order placement
    const orderId = `ORD-${Date.now()}`;
    clearCart();
    toast.success('Order placed successfully!');
    navigate(`/order-confirmation/${orderId}`);
  };

  const steps = [
    { id: 'shipping', label: 'Shipping', completed: !!shippingData },
    { id: 'payment', label: 'Payment', completed: !!paymentData },
    { id: 'review', label: 'Review', completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-white text-3xl lg:text-5xl mb-8 lg:mb-12 uppercase tracking-wider">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  s.completed ? 'bg-[#EEFF00] text-black' :
                  step === s.id ? 'bg-white text-black' :
                  'bg-white/10 text-white/40'
                }`}>
                  {s.completed ? <Check size={16} /> : idx + 1}
                </div>
                <span className={`text-sm ${step === s.id ? 'font-medium text-white' : 'text-white/60'}`}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-white/10 mx-4" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Shipping Form */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit(onShippingSubmit)} className="space-y-6">
                <div>
                  <h2 className="text-white text-xl mb-6 uppercase tracking-wider">Shipping Information</h2>

                  {!user && (
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-sm text-sm text-white/70">
                      Already have an account? <a href="/auth" className="underline text-[#EEFF00] hover:text-[#EEFF00]/80">Sign in</a> to use saved addresses
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Full Name *</label>
                      <input
                        {...registerShipping('fullName', { required: 'Name is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                      {shippingErrors.fullName && <p className="text-xs text-red-400 mt-1">{shippingErrors.fullName.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        {...registerShipping('email', { required: 'Email is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                      {shippingErrors.email && <p className="text-xs text-red-400 mt-1">{shippingErrors.email.message}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Address Line 1 *</label>
                      <input
                        {...registerShipping('addressLine1', { required: 'Address is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Address Line 2</label>
                      <input
                        {...registerShipping('addressLine2')}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">City *</label>
                      <input
                        {...registerShipping('city', { required: 'City is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Postcode *</label>
                      <input
                        {...registerShipping('postcode', { required: 'Postcode is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Phone *</label>
                      <input
                        type="tel"
                        {...registerShipping('phone', { required: 'Phone is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm mb-3 text-white/80 uppercase tracking-wider">Shipping Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-white/20 rounded-sm cursor-pointer hover:border-[#EEFF00] transition-colors">
                        <input type="radio" {...registerShipping('shippingMethod')} value="standard" defaultChecked className="w-4 h-4 accent-[#EEFF00]" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-white">Standard Delivery</span>
                            <span className="text-sm text-white">{subtotal > 100 ? 'Free' : '£4.99'}</span>
                          </div>
                          <p className="text-xs text-white/50">5-7 business days</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-white/20 rounded-sm cursor-pointer hover:border-[#EEFF00] transition-colors">
                        <input type="radio" {...registerShipping('shippingMethod')} value="express" className="w-4 h-4 accent-[#EEFF00]" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-white">Express Delivery</span>
                            <span className="text-sm text-white">£9.99</span>
                          </div>
                          <p className="text-xs text-white/50">2-3 business days</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors">
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-6">
                <h2 className="text-white text-xl mb-6 uppercase tracking-wider">Payment Information</h2>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Card Number *</label>
                    <input
                      {...registerPayment('cardNumber', { required: 'Card number is required' })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Name on Card *</label>
                    <input
                      {...registerPayment('cardName', { required: 'Name is required' })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Expiry Date *</label>
                      <input
                        {...registerPayment('expiryDate', { required: 'Expiry date is required' })}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">CVV *</label>
                      <input
                        {...registerPayment('cvv', { required: 'CVV is required' })}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...registerPayment('billingAddressSame')} defaultChecked className="w-4 h-4 accent-[#EEFF00]" />
                    <span className="text-sm text-white">Billing address same as shipping</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="px-8 py-4 border border-white/20 rounded-sm hover:border-white/40 transition-colors text-white uppercase tracking-wider text-sm"
                  >
                    Back
                  </button>
                  <button type="submit" className="flex-1 px-8 py-4 bg-[#EEFF00] text-black rounded-sm hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm">
                    Review Order
                  </button>
                </div>
              </form>
            )}

            {/* Review */}
            {step === 'review' && shippingData && paymentData && (
              <div className="space-y-6">
                <h2 className="text-white text-xl mb-6 uppercase tracking-wider">Review Your Order</h2>

                <div>
                  <h3 className="text-sm mb-3 text-white/80 uppercase tracking-wider">Shipping Address</h3>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-sm">
                    <p className="text-white">{shippingData.fullName}</p>
                    <p className="text-white">{shippingData.addressLine1}</p>
                    {shippingData.addressLine2 && <p className="text-white">{shippingData.addressLine2}</p>}
                    <p className="text-white">{shippingData.city}, {shippingData.postcode}</p>
                    <p className="text-white">{shippingData.phone}</p>
                    <p className="mt-2 text-white/60">
                      {shippingData.shippingMethod === 'express' ? 'Express Delivery' : 'Standard Delivery'}
                    </p>
                  </div>
                  <button onClick={() => setStep('shipping')} className="text-sm text-white/60 hover:text-[#EEFF00] underline mt-2 uppercase tracking-wider">
                    Edit
                  </button>
                </div>

                <div>
                  <h3 className="text-sm mb-3 text-white/80 uppercase tracking-wider">Payment Method</h3>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-sm">
                    <p className="text-white">Card ending in {paymentData.cardNumber.slice(-4)}</p>
                    <p className="text-white/60">{paymentData.cardName}</p>
                  </div>
                  <button onClick={() => setStep('payment')} className="text-sm text-white/60 hover:text-[#EEFF00] underline mt-2 uppercase tracking-wider">
                    Edit
                  </button>
                </div>

                <label className="flex items-start gap-2">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 accent-[#EEFF00]" />
                  <span className="text-sm text-white">I agree to the <a href="/terms" className="underline text-[#EEFF00] hover:text-[#EEFF00]/80">terms and conditions</a></span>
                </label>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('payment')}
                    className="px-8 py-4 border border-white/20 rounded-sm hover:border-white/40 transition-colors text-white uppercase tracking-wider text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    className="flex-1 px-8 py-4 bg-[#EEFF00] text-black rounded-sm hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 sticky top-24">
              <h2 className="text-white text-lg mb-6 uppercase tracking-wider">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.sizeId}`} className="flex gap-3 text-sm">
                    <div className="w-16 h-16 bg-neutral-900 rounded flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-white">{item.product.title}</p>
                      <p className="text-xs text-white/60">{item.size.label} × {item.quantity}</p>
                    </div>
                    <p className="text-white">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <dl className="space-y-3 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <dt className="text-white/60">Subtotal</dt>
                  <dd className="text-white">£{subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Shipping</dt>
                  <dd className="text-white">{shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <dt className="text-white uppercase tracking-wider">Total</dt>
                  <dd className="text-[#EEFF00] text-xl">£{total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}