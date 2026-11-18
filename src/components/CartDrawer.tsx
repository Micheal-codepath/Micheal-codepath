import { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Ticket,
  CheckCircle2,
  AlertCircle,
  PartyPopper,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { offers, expiredPromos, areas, type Offer } from '@/data/mockData';
import {
  formatNaira,
  illustrativeDeliveryFee,
  discountFor,
  applyPromoCode,
  generateOrderRef,
  isValidNigerianPhone,
  FREE_DELIVERY_THRESHOLD,
} from '@/utils/pricing';
import FoodImage from '@/components/FoodImage';

type Step = 'cart' | 'details' | 'done';

interface CartDrawerProps {
  defaultArea: string;
}

interface DetailsForm {
  fullName: string;
  phone: string;
  address: string;
  area: string;
  notes: string;
}

const emptyForm = (area: string): DetailsForm => ({
  fullName: '',
  phone: '',
  address: '',
  area,
  notes: '',
});

export default function CartDrawer({ defaultArea }: CartDrawerProps) {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [step, setStep] = useState<Step>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<Offer | null>(null);
  const [promoMessage, setPromoMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [form, setForm] = useState<DetailsForm>(() => emptyForm(defaultArea));
  const [errors, setErrors] = useState<Partial<DetailsForm>>({});
  const [orderRef, setOrderRef] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [confirmedMeta, setConfirmedMeta] = useState({ name: '', area: '' });

  const subtotal = totalPrice;
  const promoValid =
    appliedPromo !== null && subtotal >= appliedPromo.minSubtotal;
  const discount = promoValid ? discountFor(appliedPromo, subtotal) : 0;
  const freeDelivery = promoValid && appliedPromo.kind === 'freeDelivery';
  const deliveryFee = illustrativeDeliveryFee(subtotal - discount, freeDelivery);
  const total = subtotal - discount + deliveryFee;

  const close = () => {
    setIsOpen(false);
    if (step === 'done') {
      setStep('cart');
      setAppliedPromo(null);
      setPromoMessage(null);
      setPromoInput('');
      setErrors({});
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const handleApplyPromo = () => {
    const outcome = applyPromoCode(promoInput, subtotal, offers, expiredPromos);
    if (outcome.status === 'applied') {
      setAppliedPromo(outcome.promo);
      setPromoMessage({ type: 'success', text: outcome.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: outcome.message });
    }
  };

  const setField = (field: keyof DetailsForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateDetails = (): boolean => {
    const next: Partial<DetailsForm> = {};
    if (form.fullName.trim().length < 2)
      next.fullName = 'Please enter your full name.';
    if (!isValidNigerianPhone(form.phone.trim()))
      next.phone = 'Enter a valid Nigerian number, e.g. 0803 123 4567.';
    if (form.address.trim().length < 8)
      next.address = 'Please enter a full street address.';
    if (!form.area) next.area = 'Choose a delivery area.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeDemoOrder = () => {
    if (!validateDetails()) return;
    setOrderRef(generateOrderRef());
    setConfirmedTotal(total);
    setConfirmedMeta({ name: form.fullName.trim(), area: form.area });
    setStep('done');
    clearCart();
    setAppliedPromo(null);
    setPromoMessage(null);
    setPromoInput('');
  };

  const startCheckout = () => {
    setForm((prev) => ({ ...prev, area: prev.area || defaultArea }));
    setStep('details');
  };

  if (!isOpen) return null;

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 bg-stone-50 border rounded-xl text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent ${
      hasError ? 'border-red-400' : 'border-stone-200'
    }`;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            {step === 'details' ? (
              <button
                onClick={() => setStep('cart')}
                className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Back to cart"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
            ) : (
              <ShoppingBag className="w-5 h-5 text-orange-600" />
            )}
            <h3 className="font-bold text-stone-900 text-lg">
              {step === 'cart' && 'Your Cart'}
              {step === 'details' && 'Delivery Details'}
              {step === 'done' && 'Order Confirmation'}
            </h3>
            {step === 'cart' && totalItems > 0 && (
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {step === 'done' ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center pt-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="w-10 h-10 text-emerald-600" />
              </div>
              <h4 className="text-xl font-extrabold text-stone-900 mb-1">
                Demo order confirmed!
              </h4>
              <p className="text-sm text-stone-500 mb-4">
                Reference <span className="font-mono font-bold text-stone-800">{orderRef}</span>
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 mb-5 text-left">
                This is a frontend demonstration — no real order was placed,
                no rider was dispatched and no payment was taken.
              </div>
              <dl className="bg-stone-50 rounded-xl p-4 text-sm text-left space-y-2 mb-6">
                <div className="flex justify-between">
                  <dt className="text-stone-500">Customer</dt>
                  <dd className="font-semibold text-stone-800">{confirmedMeta.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Deliver to</dt>
                  <dd className="font-semibold text-stone-800">
                    {confirmedMeta.area}, Lagos
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Illustrative total</dt>
                  <dd className="font-extrabold text-stone-900">
                    {formatNaira(confirmedTotal)}
                  </dd>
                </div>
              </dl>
              <button
                onClick={close}
                className="w-full py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors"
              >
                Back to browsing
              </button>
            </div>
          </div>
        ) : items.length === 0 && step === 'cart' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-stone-300" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-stone-500 mb-6">
              Browse the sample menus and add some jollof, suya or shawarma.
            </p>
            <button
              onClick={close}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors"
            >
              Browse Meals
            </button>
          </div>
        ) : step === 'details' ? (
          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-sm text-stone-500 bg-stone-50 border border-stone-200 rounded-xl p-3 mb-5">
              Demonstration checkout — details stay in your browser and are
              never sent anywhere.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="co-name" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Full name *
                </label>
                <input
                  id="co-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  placeholder="Adaeze Okafor"
                  autoComplete="name"
                  className={inputClass(!!errors.fullName)}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label htmlFor="co-phone" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Phone number *
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder="0803 123 4567"
                  autoComplete="tel"
                  className={inputClass(!!errors.phone)}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="co-address" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Street address *
                </label>
                <input
                  id="co-address"
                  type="text"
                  value={form.address}
                  onChange={(e) => setField('address', e.target.value)}
                  placeholder="14 Allen Avenue, Ikeja"
                  autoComplete="street-address"
                  className={inputClass(!!errors.address)}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <label htmlFor="co-area" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Area *
                </label>
                <select
                  id="co-area"
                  value={form.area}
                  onChange={(e) => setField('area', e.target.value)}
                  className={inputClass(!!errors.area)}
                >
                  <option value="">Select an area</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}, Lagos
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p className="text-xs text-red-600 mt-1">{errors.area}</p>
                )}
              </div>
              <div>
                <label htmlFor="co-notes" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Delivery notes <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <textarea
                  id="co-notes"
                  value={form.notes}
                  onChange={(e) => setField('notes', e.target.value)}
                  placeholder="Gate code, landmark, extra pepper..."
                  rows={2}
                  className={`${inputClass(false)} resize-none`}
                />
              </div>
            </div>

            <div className="mt-6 border-t border-stone-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-medium text-stone-700">{formatNaira(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo savings</span>
                  <span className="font-medium">−{formatNaira(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Delivery fee (illustrative)</span>
                <span className="font-medium text-stone-700">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    formatNaira(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100">
                <span className="font-bold text-stone-900">Total</span>
                <span className="font-extrabold text-stone-900 text-lg">
                  {formatNaira(total)}
                </span>
              </div>
            </div>

            <button
              onClick={placeDemoOrder}
              className="mt-4 w-full py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              Place demo order
              <CheckCircle2 className="w-5 h-5" />
            </button>
            <p className="text-xs text-stone-400 text-center mt-3">
              No payment page follows — this demo ends at confirmation.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-stone-900 text-sm leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-xs text-stone-400">
                          {item.restaurant}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 shadow-sm border border-stone-100">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-md hover:bg-orange-50 text-stone-600 flex items-center justify-center transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-stone-800 text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-md hover:bg-orange-50 text-stone-600 flex items-center justify-center transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-bold text-stone-900 text-sm">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="w-full py-2 text-sm text-stone-400 hover:text-red-500 transition-colors"
              >
                Clear all items
              </button>

              <div className="border-t border-stone-100 pt-4">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 mb-2">
                  <Ticket className="w-4 h-4 text-orange-600" /> Promo code
                </p>
                {promoValid && appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                    <span className="text-sm font-mono font-bold text-emerald-800">
                      {appliedPromo.code}
                    </span>
                    <button
                      onClick={() => {
                        setAppliedPromo(null);
                        setPromoMessage(null);
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleApplyPromo();
                      }}
                      placeholder="Try NAIJA2000"
                      aria-label="Promo code"
                      className="flex-1 min-w-0 px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono uppercase placeholder:normal-case placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-colors flex-shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {appliedPromo && !promoValid && (
                  <p className="flex items-start gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {appliedPromo.code} needs a minimum order of{' '}
                    {formatNaira(appliedPromo.minSubtotal)} — add more items to
                    use it.
                  </p>
                )}
                {promoMessage && (
                  <p
                    className={`flex items-start gap-1.5 text-xs mt-2 ${
                      promoMessage.type === 'success'
                        ? 'text-emerald-700'
                        : 'text-red-600'
                    }`}
                  >
                    {promoMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    {promoMessage.text}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-stone-100 p-5 space-y-2.5">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal</span>
                <span className="font-medium text-stone-700">
                  {formatNaira(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-700">
                  <span>Promo savings</span>
                  <span className="font-medium">−{formatNaira(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-stone-500">
                <span>Delivery fee (illustrative)</span>
                <span className="font-medium text-stone-700">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    formatNaira(deliveryFee)
                  )}
                </span>
              </div>
              {deliveryFee > 0 ? (
                <p className="text-xs text-orange-700 bg-orange-50 rounded-lg p-2">
                  Add {formatNaira(FREE_DELIVERY_THRESHOLD - (subtotal - discount))}{' '}
                  more for free delivery!
                </p>
              ) : (
                subtotal > 0 && (
                  <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg p-2">
                    You have unlocked FREE delivery (illustrative).
                  </p>
                )
              )}
              <div className="flex justify-between pt-2.5 border-t border-stone-100">
                <span className="font-bold text-stone-900">Total</span>
                <span className="font-extrabold text-stone-900 text-lg">
                  {formatNaira(total)}
                </span>
              </div>
              <button
                onClick={startCheckout}
                className="w-full py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
