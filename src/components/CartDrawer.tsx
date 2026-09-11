import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
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

  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    setCheckoutDone(true);
    clearCart();
    setTimeout(() => {
      setCheckoutDone(false);
      setIsOpen(false);
    }, 3000);
  };

  const deliveryFee = totalPrice > 30 || totalPrice === 0 ? 0 : 2.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + deliveryFee + tax;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-gray-900 text-lg">
                  Your Cart
                </h3>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {checkoutDone ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Order Placed!
                </h3>
                <p className="text-gray-500">
                  Your delicious food is on the way. Estimated delivery in 25
                  minutes.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Browse our popular dishes and add your favorites to the cart.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {item.restaurant}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded-md hover:bg-orange-50 text-gray-600 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-gray-800 text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-md hover:bg-orange-50 text-gray-600 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear all items
                  </button>
                </div>

                <div className="border-t border-gray-100 p-5 space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-gray-700">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax (8%)</span>
                    <span className="font-medium text-gray-700">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-orange-500 bg-orange-50 rounded-lg p-2">
                      Add ${(30 - totalPrice).toFixed(2)} more for free delivery!
                    </p>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900 text-lg">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
