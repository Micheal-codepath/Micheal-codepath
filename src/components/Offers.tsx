import { useState } from 'react';
import { offers } from '@/data/mockData';
import { Check, Copy, Ticket } from 'lucide-react';
import Reveal from '@/components/Reveal';

const accentText: Record<string, string> = {
  o1: 'text-orange-700',
  o2: 'text-emerald-700',
  o3: 'text-stone-900',
};

export default function Offers() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard unavailable — the code is still visible to type manually */
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="offers" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Deals worth opening the app for
          </h2>
          <p className="text-stone-500 mt-3 max-w-lg mx-auto">
            Fresh promotions to make your meals even more affordable. Copy a
            code and apply it in your cart.
          </p>
        </Reveal>

        <Reveal delay={100}>
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className={`relative overflow-hidden rounded-3xl ${offer.color} p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white mb-3">
                    <Ticket className="w-3.5 h-3.5" />
                    {offer.discount}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-white/85 text-sm mb-6">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-4 py-3 bg-white/20 rounded-xl border border-dashed border-white/40 text-white font-mono font-bold tracking-wider text-sm sm:text-base overflow-x-auto whitespace-nowrap">
                      {offer.code}
                    </div>
                    <button
                      onClick={() => copyCode(offer.code, offer.id)}
                      className={`px-4 py-3 bg-white rounded-xl font-semibold text-sm hover:bg-stone-100 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 ${accentText[offer.id] ?? 'text-stone-900'}`}
                      aria-label={`Copy code ${offer.code}`}
                    >
                      {copiedId === offer.id ? (
                        <>
                          <Check className="w-4 h-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>

        <p className="text-center text-sm text-stone-400 mt-8">
          Every code is checked instantly at checkout — savings apply before
          you pay.
        </p>
      </div>
    </section>
  );
}
