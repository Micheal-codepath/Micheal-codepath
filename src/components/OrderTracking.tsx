import { useState, useEffect, useRef } from 'react';
import {
  X,
  Check,
  Star,
  Bike,
  Phone,
  Send,
  PackageSearch,
  ReceiptText,
  MapPin,
  Clock,
} from 'lucide-react';
import { trackingStages, riderInfo, riderReplies } from '@/data/tracking';
import type { OrderSimulation } from '@/hooks/useOrderSimulation';
import { useDelayedUnmount } from '@/hooks/useDelayedUnmount';
import { formatNaira } from '@/utils/pricing';
import TrackingMap from '@/components/TrackingMap';
import FoodImage from '@/components/FoodImage';
import Logo from '@/components/Logo';

interface OrderTrackingProps {
  open: boolean;
  simulation: OrderSimulation;
  onClose: () => void;
  onBrowse: () => void;
}

interface ChatMessage {
  from: 'rider' | 'you';
  text: string;
  time: string;
}

function now(): string {
  return new Date().toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatTime(timestamp: number | null): string {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function OrderTracking({ open, simulation, onClose, onBrowse }: OrderTrackingProps) {
  const { order, stageIndex, progress, etaMinutes, stageTimes } = simulation;
  const mount = useDelayedUnmount(open, 250);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: 'rider', text: `Hello! I'm ${riderInfo.name} your rider. I'll keep you posted.`, time: now() },
  ]);
  const [draft, setDraft] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const replyTimer = useRef<number | null>(null);
  const chatBox = useRef<HTMLDivElement>(null);
  const chatInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    const box = chatBox.current;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    };
  }, []);

  if (!mount.shouldRender) return null;

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'you', text, time: now() }]);
    setDraft('');
    if (replyTimer.current) window.clearTimeout(replyTimer.current);
    const reply = riderReplies[replyCount % riderReplies.length];
    setReplyCount((c) => c + 1);
    replyTimer.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'rider', text: reply, time: now() }]);
    }, 1200);
  };

  const delivered = order !== null && stageIndex >= trackingStages.length - 1;
  const restaurants = order
    ? [...new Set(order.items.map((i) => i.restaurant))]
    : [];
  const primaryRestaurant = restaurants[0] ?? '';

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-stone-100">
      <div
        className={`min-h-full transition-opacity duration-200 ${
          mount.visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Logo markSize="w-9 h-9" />
              <div className="hidden sm:block w-px h-8 bg-stone-300" aria-hidden="true" />
              <div>
                <h2 className="font-extrabold text-stone-900 text-lg leading-tight">
                  Track your order
                </h2>
                {order && (
                  <p className="text-xs text-stone-500">
                    <span className="font-mono font-bold text-stone-700">{order.ref}</span>
                    {' • '}placed at {formatTime(order.placedAt)}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 active:scale-95 transition-all"
              aria-label="Close tracking"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!order ? (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-10 sm:p-16 text-center max-w-xl mx-auto animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-5">
                <PackageSearch className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 mb-2">
                No active order yet
              </h3>
              <p className="text-stone-500 mb-7">
                When you place an order, you can follow it here — from the
                kitchen to your door.
              </p>
              <button
                onClick={onBrowse}
                className="px-7 py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 hover:shadow-lg active:scale-[0.98] transition-all"
              >
                Explore meals
              </button>
            </div>
          ) : (
            <>
              {/* status banner */}
              <div
                className={`rounded-2xl p-5 sm:p-6 mb-5 text-white shadow-md transition-colors duration-500 ${
                  delivered ? 'bg-emerald-700' : 'bg-stone-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Bike className="w-6 h-6" />
                      {!delivered && (
                        <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <p className="font-extrabold text-lg leading-tight">
                        {delivered
                          ? 'Delivered — enjoy your meal!'
                          : trackingStages[stageIndex].label}
                      </p>
                      <p className="text-sm text-white/70">
                        {delivered
                          ? 'Thanks for ordering with RiyalEats.'
                          : trackingStages[stageIndex].message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-xs text-white/70">
                        {delivered ? 'Delivered at' : 'Arriving in'}
                      </p>
                      <p className="font-extrabold leading-tight">
                        {delivered
                          ? formatTime(stageTimes[stageTimes.length - 1])
                          : `~${etaMinutes} min`}
                      </p>
                    </div>
                  </div>
                </div>
                {/* progress bar */}
                <div className="mt-4 h-2 rounded-full bg-white/15 overflow-hidden" aria-hidden="true">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      delivered ? 'bg-white' : 'bg-orange-500'
                    }`}
                    style={{
                      width: `${((stageIndex + (stageIndex === 3 ? progress : 0)) / (trackingStages.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-5">
                <div className="lg:col-span-3 space-y-5">
                  {/* map */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-5">
                    <TrackingMap
                      progress={progress}
                      restaurantName={primaryRestaurant}
                      area={order.area}
                    />
                  </div>

                  {/* timeline */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                    <h3 className="font-extrabold text-stone-900 mb-5">
                      Delivery progress
                    </h3>
                    <ol className="space-y-0">
                      {trackingStages.map((stage, i) => {
                        const Icon = stage.icon;
                        const done = i < stageIndex;
                        const active = i === stageIndex;
                        const upcoming = i > stageIndex;
                        return (
                          <li key={stage.id} className="relative flex gap-4 pb-6 last:pb-0">
                            {i < trackingStages.length - 1 && (
                              <span
                                className={`absolute left-[22px] top-12 bottom-0 w-0.5 transition-colors duration-500 ${
                                  done ? 'bg-emerald-500' : 'bg-stone-200'
                                }`}
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                                done
                                  ? 'bg-emerald-600 text-white'
                                  : active
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                                    : 'bg-stone-100 text-stone-400'
                              }`}
                            >
                              {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                              {active && !delivered && (
                                <span className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping" aria-hidden="true" />
                              )}
                            </span>
                            <div className="flex-1 pt-1">
                              <div className="flex items-center justify-between gap-2">
                                <p
                                  className={`font-bold ${
                                    upcoming ? 'text-stone-400' : 'text-stone-900'
                                  }`}
                                >
                                  {stage.label}
                                </p>
                                {stageTimes[i] !== null && (
                                  <span className="text-xs text-stone-400 font-medium whitespace-nowrap">
                                    {formatTime(stageTimes[i])}
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-sm mt-0.5 transition-colors ${
                                  upcoming ? 'text-stone-400' : 'text-stone-500'
                                }`}
                              >
                                {stage.message}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-5">
                  {/* order summary */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                    <h3 className="font-extrabold text-stone-900 mb-1 flex items-center gap-2">
                      <ReceiptText className="w-5 h-5 text-orange-600" />
                      Order {order.ref}
                    </h3>
                    <p className="text-sm text-stone-500 mb-4">
                      {restaurants.join(' • ')}
                    </p>
                    <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <FoodImage
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-stone-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-stone-400">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-stone-900 whitespace-nowrap">
                            {formatNaira(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-stone-100 pt-3 space-y-1.5 text-sm">
                      <div className="flex justify-between text-stone-500">
                        <span>Subtotal</span>
                        <span className="font-medium text-stone-700">{formatNaira(order.subtotal)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-emerald-700">
                          <span>Promo savings</span>
                          <span className="font-medium">−{formatNaira(order.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-stone-500">
                        <span>Delivery fee</span>
                        <span className="font-medium text-stone-700">
                          {order.deliveryFee === 0 ? (
                            <span className="text-emerald-600 font-semibold">FREE</span>
                          ) : (
                            formatNaira(order.deliveryFee)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t border-stone-100">
                        <span className="font-bold text-stone-900">Total</span>
                        <span className="font-extrabold text-stone-900">{formatNaira(order.total)}</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-stone-50 rounded-xl p-3 text-sm flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-stone-800">
                          {order.address}
                          {order.address.toLowerCase().includes(order.area.toLowerCase())
                            ? ''
                            : `, ${order.area}`}
                        </p>
                        <p className="text-stone-500 text-xs mt-0.5">
                          {order.customerName} • {order.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* rider card */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                    <h3 className="font-extrabold text-stone-900 mb-4">
                      Your rider
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                        {riderInfo.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-stone-900">{riderInfo.name}</p>
                        <p className="text-xs text-stone-500 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {riderInfo.rating} • {riderInfo.deliveries}
                        </p>
                      </div>
                      <button
                        onClick={() => chatInput.current?.focus()}
                        className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all"
                        aria-label={`Contact ${riderInfo.name}`}
                        title="Contact rider"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-stone-50 rounded-xl px-3 py-2.5 text-sm">
                      <span className="flex items-center gap-2 text-stone-600">
                        <Bike className="w-4 h-4" /> {riderInfo.vehicle}
                      </span>
                      <span className="font-mono font-bold text-stone-800 text-xs bg-white border border-stone-200 rounded-md px-2 py-1">
                        {riderInfo.plate}
                      </span>
                    </div>
                  </div>

                  {/* chat */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                    <h3 className="font-extrabold text-stone-900 mb-4">
                      Chat with your rider
                    </h3>
                    <div ref={chatBox} className="space-y-2.5 mb-4 max-h-48 overflow-y-auto pr-1">
                      {messages.map((m, i) => (
                        <div
                          key={i}
                          className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-200`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                              m.from === 'you'
                                ? 'bg-orange-600 text-white rounded-br-md'
                                : 'bg-stone-100 text-stone-800 rounded-bl-md'
                            }`}
                          >
                            <p>{m.text}</p>
                            <p
                              className={`text-[11px] mt-1 ${
                                m.from === 'you' ? 'text-white/70' : 'text-stone-400'
                              }`}
                            >
                              {m.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        ref={chatInput}
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') sendMessage();
                        }}
                        placeholder="Message your rider..."
                        aria-label="Message your rider"
                        className="flex-1 min-w-0 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                      <button
                        onClick={sendMessage}
                        className="p-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 active:scale-95 transition-all flex-shrink-0"
                        aria-label="Send message"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {delivered && (
                    <button
                      onClick={onBrowse}
                      className="w-full py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-700 active:scale-[0.98] transition-all animate-in fade-in duration-300"
                    >
                      Order again
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
