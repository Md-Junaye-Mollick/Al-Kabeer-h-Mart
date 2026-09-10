import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  MapPin,
  Clock,
  CheckCircle2,
  Crown,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Truck,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { PaymentOptions } from '../components/PaymentOptions';

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartSubtotal, deliveryFee, isVip, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { addOrder } = useOrders();
  const { t } = useLanguage();

  // Determine checkout items based on navigation source
  const state = location.state || {};
  const isDirect = state.source === 'direct' && state.product;

  const checkoutItems = isDirect
    ? [{ ...state.product, quantity: state.quantity || 1 }]
    : cart;

  // Form State initialized from saved addresses or fallback
  const initialAddr = (() => {
    try {
      const saved = localStorage.getItem('alkabeer_saved_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        const def = parsed.find((a) => a.isDefault) || parsed[0];
        if (def) {
          const formatted = [def.house, def.street, def.landmark, def.city]
            .filter(Boolean)
            .join(', ');
          return {
            name: def.name || user?.name || 'Tariq Ahmed',
            phone: def.phone ? def.phone.replace('+91 ', '').replace('+91', '') : user?.phone || '9002461519',
            address: formatted || user?.address || 'Mollar Chawk, Sarkarpara More, Bhagabatipur, Hooghly - 712701',
            pincode: def.pincode || '712701',
          };
        }
      }
    } catch (e) {
      // ignore
    }
    return {
      name: user?.name || 'Tariq Ahmed',
      phone: user?.phone || '9002461519',
      address: user?.address || 'Mollar Chawk, Sarkarpara More, Bhagabatipur, Hooghly - 712701',
      pincode: '712701',
    };
  })();

  const [name, setName] = useState(initialAddr.name);
  const [phone, setPhone] = useState(initialAddr.phone);
  const [address, setAddress] = useState(initialAddr.address);
  const [pincode, setPincode] = useState(initialAddr.pincode);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'upi', 'card', 'netbanking'
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: user?.name || 'Tariq Ahmed',
    selectedBank: 'HDFC Bank',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Authentication Guard: if not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  // If no items in checkout and not in success view, redirect back
  useEffect(() => {
    if (checkoutItems.length === 0 && !orderSuccess && isAuthenticated) {
      navigate('/cart');
    }
  }, [checkoutItems, orderSuccess, isAuthenticated, navigate]);

  const itemsTotal = isDirect
    ? (state.product?.price || 0) * (state.quantity || 1)
    : cartSubtotal;

  const currentDeliveryFee = isVip ? 0 : 10;
  const finalTotal = itemsTotal + currentDeliveryFee;

  const getPaymentPreferenceLabel = () => {
    switch (paymentMethod) {
      case 'cod':
        return 'Cash on Delivery (Pay at Door)';
      case 'upi':
        return 'UPI / QR (alkabeermart@upi)';
      case 'card': {
        const last4 = paymentDetails.cardNumber.trim().slice(-4);
        return `Credit/Debit Card ${last4 ? `(ending in ${last4})` : ''}`;
      }
      case 'netbanking':
        return `Net Banking (${paymentDetails.selectedBank || 'Selected Bank'})`;
      default:
        return 'Cash on Delivery';
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please provide complete delivery details');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrderId = 'AKM-' + Math.floor(100000 + Math.random() * 900000);
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const paymentPreference = getPaymentPreferenceLabel();

      const newOrder = {
        id: newOrderId,
        date: currentDate,
        status: 'Order Received',
        statusType: 'active',
        subtotal: itemsTotal,
        deliveryFee: currentDeliveryFee,
        total: finalTotal,
        paymentMethod: paymentPreference,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        deliveryAddress: address.trim(),
        pincode: pincode.trim(),
        estDelivery: '10–15 Minutes',
        items: checkoutItems.map((item) => ({
          id: item.id,
          name: item.name,
          weight: item.weight,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
      };

      // Add to persistent OrderContext
      addOrder(newOrder);

      // If cart checkout, clear cart
      if (!isDirect) {
        clearCart();
      }

      // Generate formatted WhatsApp message per requirements
      let message = `🛒 *AL KABEER H MART — New Order*\n`;
      message += `*Order ID:* ${newOrderId}\n`;
      message += `*Date:* ${currentDate}\n\n`;
      message += `📦 *Order Details*\n`;
      message += `-------------------------\n`;

      checkoutItems.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Quantity: ${item.quantity} (${item.weight || ''})\n`;
        message += `   Price: ₹${item.price * item.quantity}\n\n`;
      });

      message += `-------------------------\n`;
      message += `💰 *Subtotal:* ₹${itemsTotal}\n`;
      message += `🚚 *Delivery:* ${currentDeliveryFee === 0 ? 'FREE (VIP)' : `₹${currentDeliveryFee}`}\n`;
      message += `💳 *Payment Preference:* ${paymentPreference}\n`;
      message += `💵 *Total:* ₹${finalTotal}\n`;
      message += `-------------------------\n\n`;
      message += `👤 *Customer Details*\n`;
      message += `Name: ${name.trim()}\n`;
      message += `Phone: ${phone.trim()}\n\n`;
      message += `📍 *Delivery Address:*\n`;
      message += `${address.trim()} - ${pincode.trim()}\n\n`;
      message += `⚡ *Estimated Dispatch:* 10–15 Minutes from Bhagabatipur Hub\n\n`;
      message += `Thank you for ordering from AL KABEER H MART!`;

      const whatsAppUrl = `https://wa.me/919002461519?text=${encodeURIComponent(message)}`;

      // Open WhatsApp with properly formatted order message
      window.open(whatsAppUrl, '_blank');

      setIsSubmitting(false);
      setOrderSuccess({ ...newOrder, whatsAppUrl });
    }, 600);
  };

  if (!isAuthenticated) {
    return null;
  }

  // ORDER SUCCESS SCREEN
  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 animate-fade-in">
        <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-border shadow-xl text-center">
          <div className="w-20 h-20 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <span className="inline-flex items-center gap-1.5 bg-secondary/30 text-amber-900 text-xs font-black px-3 py-1 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-800" />
            <span>{t('checkout.estDelivery')}: {t('checkout.estTime')}</span>
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            {t('checkout.orderSuccessTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-md mx-auto leading-relaxed">
            Your order has been recorded and WhatsApp has been opened to dispatch this order to our Bhagabatipur hub.
          </p>

          <div className="my-6 p-4 sm:p-5 bg-surface-soft rounded-2xl border border-border/80 text-left space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
              <span className="text-text-muted">{t('checkout.orderId')}:</span>
              <span className="font-black text-primary font-mono text-sm">{orderSuccess.id}</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
              <span className="text-text-muted">{t('checkout.deliveryAddress')}:</span>
              <span className="font-semibold text-text-primary text-right truncate max-w-[240px]">
                {orderSuccess.deliveryAddress}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
              <span className="text-text-muted">Payment Preference:</span>
              <span className="font-bold text-text-primary text-right truncate max-w-[200px]">
                {orderSuccess.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1">
              <span className="font-black text-text-primary">{t('cart.grandTotal')}:</span>
              <span className="font-black text-primary text-lg">₹{orderSuccess.total}</span>
            </div>
          </div>

          {/* Action Buttons: WhatsApp Reopen + View Orders */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={orderSuccess.whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebc5c] text-white font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open in WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => navigate('/account?tab=orders')}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              {t('checkout.viewMyOrders')}
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto bg-surface-soft hover:bg-surface border border-border text-text-primary font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm transition-all text-center"
            >
              {t('checkout.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-secondary font-medium mb-6">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-text-muted">/</span>
        <Link to="/cart" className="hover:text-primary transition-colors">
          {t('cart.title')}
        </Link>
        <span className="text-text-muted">/</span>
        <span className="text-primary font-bold">{t('checkout.title')}</span>
      </nav>

      {/* Header Banner */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div>
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
              {t('checkout.title')}
            </h1>
            <span className="text-xs font-black bg-primary-light text-primary px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
              {isDirect ? t('checkout.directOrderBadge') : t('checkout.cartOrderBadge')}
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            {t('checkout.deliveryAddressNote')}
          </p>
        </div>
      </div>

      {/* Main Grid: Form + Order Summary */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* LEFT COLUMN: Delivery Details & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Delivery Address */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-black text-text-primary truncate">
                  {t('checkout.deliveryAddress')}
                </h2>
              </div>
              <span className="text-[11px] font-bold text-success flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>10-15 Mins Delivery</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-black text-text-primary mb-1">
                  {t('checkout.fullName')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-text-primary mb-1">
                  {t('checkout.phoneNumber')}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-text-primary mb-1">
                  {t('checkout.addressLine')}
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-text-primary mb-1">
                  {t('checkout.pincode')}
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-text-primary mb-1">
                  {t('checkout.deliverySlot')}
                </label>
                <div className="w-full h-10 px-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('checkout.instantDelivery')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Interactive Payment Method Accordion */}
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-black text-text-primary">
                  {t('checkout.paymentMethod')}
                </h2>
              </div>
              <span className="text-[11px] text-text-muted font-medium">
                Choose your preferred payment method
              </span>
            </div>

            {/* Reusable PaymentOptions Accordion Component */}
            <PaymentOptions
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
              paymentDetails={paymentDetails}
              onUpdatePaymentDetails={setPaymentDetails}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Order Items & Pricing Breakdown */}
        <div className="lg:col-span-5">
          <div className="bg-surface rounded-3xl p-5 sm:p-6 border border-border shadow-subtle space-y-4 sticky top-28">
            <h2 className="text-base font-black text-text-primary pb-3 border-b border-border flex items-center justify-between">
              <span>{t('checkout.orderSummary')}</span>
              <span className="text-xs text-text-muted font-bold">
                {checkoutItems.length} {t('checkout.itemsCount')}
              </span>
            </h2>

            {/* Selected Products List */}
            <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar pr-1">
              {checkoutItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2 rounded-xl bg-surface-soft/60"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-contain bg-surface p-1 shrink-0 border border-border/60"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-text-primary truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-text-muted">
                        {item.weight} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-black text-text-primary shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="space-y-2.5 text-xs text-text-secondary pt-3 border-t border-border">
              <div className="flex justify-between">
                <span>{t('cart.itemTotal')}</span>
                <span className="font-bold text-text-primary">₹{itemsTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>{t('cart.deliveryFee')}</span>
                <span className={`font-bold ${isVip ? 'text-success' : 'text-text-primary'}`}>
                  {isVip ? t('cart.vipFreeDelivery') : `₹${currentDeliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-success font-medium">
                <span>{t('cart.handlingFee')}</span>
                <span>{t('cart.free')}</span>
              </div>

              <div className="border-t border-dashed border-border pt-3 flex justify-between items-baseline font-black text-sm sm:text-base text-text-primary">
                <span>{t('cart.grandTotal')}</span>
                <span className="text-xl text-primary font-black">₹{finalTotal}</span>
              </div>
            </div>

            {/* WhatsApp Order Information Stamp */}
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-2.5 text-[11px] text-emerald-900">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Final Order via WhatsApp</span>
                <p className="text-emerald-700 mt-0.5">
                  Confirming this order will open WhatsApp with your full receipt, delivery address, and payment preference.
                </p>
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#25D366] hover:bg-[#1ebc5c] active:scale-[0.99] text-white font-black py-4 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-75 text-sm"
            >
              {isSubmitting ? (
                <span>{t('checkout.placingOrder')}</span>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm & Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
