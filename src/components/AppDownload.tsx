import { Smartphone, Bike, Ticket, ReceiptText } from 'lucide-react';
import { formatNaira } from '@/utils/pricing';

const features = [
  {
    icon: Ticket,
    title: 'Sample menus to explore',
    description: 'Nigerian classics plus a few international favourites',
  },
  {
    icon: ReceiptText,
    title: 'Honest demo pricing',
    description: 'Naira prices with clearly labelled illustrative fees',
  },
  {
    icon: Bike,
    title: 'Checkout walkthrough',
    description: 'Try the full cart-to-confirmation flow in your browser',
  },
];

const mockItems = [
  { name: 'Smoky Party Jollof Rice', price: 3500 },
  { name: 'Beef Suya Platter', price: 3000 },
  { name: 'Chilled Zobo (50cl)', price: 1000 },
];

export default function AppDownload() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-stone-950 shadow-2xl">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/15 mb-6">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm font-medium">
                  App concept preview
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                Made for life in Lagos
              </h2>

              <p className="text-stone-300 mb-8 max-w-md">
                This concept imagines a FoodGo mobile app built around Nigerian
                kitchens — quick reorders, area-based kitchens and delivery
                updates. The phone mockup is an illustration, not a download.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {feature.title}
                        </p>
                        <p className="text-stone-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="px-6 py-3.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
                >
                  Get launch updates
                </a>
                <a
                  href="#meals"
                  className="px-6 py-3.5 bg-transparent text-white font-semibold rounded-xl border-2 border-white/25 hover:border-white/60 transition-colors"
                >
                  Explore sample menus
                </a>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-center" aria-hidden="true">
              <div className="relative">
                <div className="relative w-64 h-[500px] bg-stone-900 rounded-[2.5rem] border-4 border-stone-700 shadow-2xl p-3 overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-stone-950 rounded-b-2xl z-10" />
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-stone-950">
                    <div className="p-5 pt-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-stone-500 text-xs">Deliver to</p>
                          <p className="text-white text-sm font-semibold">
                            Lekki, Lagos
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">F</span>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-3 mb-4">
                        <p className="text-stone-500 text-xs mb-1">Search</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-8 bg-white/10 rounded-lg" />
                          <div className="w-8 h-8 rounded-lg bg-orange-600" />
                        </div>
                      </div>

                      <div className="bg-orange-600 rounded-xl p-4 mb-4">
                        <p className="text-white text-xs opacity-80">
                          Today's offer
                        </p>
                        <p className="text-white text-lg font-bold">₦2,000 OFF</p>
                        <p className="text-white text-xs opacity-80">
                          First order • NAIJA2000
                        </p>
                      </div>

                      <p className="text-white text-sm font-semibold mb-2">
                        Popular near you
                      </p>
                      <div className="space-y-2">
                        {mockItems.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
                          >
                            <div className="w-10 h-10 rounded-lg bg-stone-700" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-xs font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-amber-400 text-xs">
                                {formatNaira(item.price)}
                              </p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-orange-400 text-xs">+</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 top-20 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Bike className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Arriving in</p>
                    <p className="font-bold text-stone-900 text-sm">12 min</p>
                  </div>
                </div>

                <div className="absolute -left-6 bottom-32 bg-white rounded-2xl shadow-2xl p-3">
                  <p className="text-xs text-stone-500">Delivery fee</p>
                  <p className="font-bold text-stone-900 text-sm">
                    {formatNaira(1200)}{' '}
                    <span className="font-normal text-stone-400">
                      (illustrative)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
