import { useState } from 'react';
import { offers } from '@/data/mockData';
import { Check, Copy } from 'lucide-react';

export default function Offers() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="offers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Save Big
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Special Offers & Deals
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Exclusive promotions and discounts to make your meals even more
            affordable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.color} p-8 shadow-xl group hover:scale-105 transition-transform duration-300`}
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                    <Icon className={`w-7 h-7 ${offer.textColor}`} />
                  </div>

                  <div
                    className={`inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold ${offer.textColor} mb-3`}
                  >
                    {offer.discount}
                  </div>

                  <h3 className={`text-2xl font-bold ${offer.textColor} mb-2`}>
                    {offer.title}
                  </h3>
                  <p className={`${offer.textColor} opacity-90 text-sm mb-6`}>
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <div
                      className={`flex-1 px-4 py-3 bg-white/20 backdrop-blur-md rounded-xl border border-dashed ${offer.textColor} border-white/40 font-mono font-bold tracking-wider`}
                    >
                      {offer.code}
                    </div>
                    <button
                      onClick={() => copyCode(offer.code, offer.id)}
                      className={`px-4 py-3 bg-white rounded-xl font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-1.5 ${
                        offer.id === 'o1'
                          ? 'text-orange-600'
                          : offer.id === 'o2'
                            ? 'text-emerald-600'
                            : 'text-violet-600'
                      }`}
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
      </div>
    </section>
  );
}
