import { Smartphone, Bell, MapPin, Star } from 'lucide-react';

const features = [
  {
    icon: Bell,
    title: 'Exclusive App Deals',
    description: 'Get notifications for flash sales and app-only discounts',
  },
  {
    icon: MapPin,
    title: 'Live Order Tracking',
    description: 'Watch your delivery arrive in real-time on the map',
  },
  {
    icon: Star,
    title: 'Rewards Program',
    description: 'Earn points on every order and redeem for free meals',
  },
];

export default function AppDownload() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
              }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                <Smartphone className="w-4 h-4 text-orange-400" />
                <span className="text-white text-sm font-medium">
                  Download the App
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Get the FoodGo app
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  for faster ordering
                </span>
              </h2>

              <p className="text-gray-300 mb-8 max-w-md">
                Download our app for exclusive deals, live tracking, and a
                seamless ordering experience. Available on iOS and Android.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {feature.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-xl hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.36-1.09-.46-2.09-.48-3.24 0-1.44.6-2.04.4-2.95-.36C3.83 15.57 4.05 8.04 7.3 6.4c1.4-.71 2.5-.05 3.4.3 1.05.4 1.4.4 2.5 0 1.27-.48 2.66-.85 3.8.2 2.7 2.5 2.7 9.7.05 11.38zM12.7 4.3c.3-2.2 2.5-3.4 4.3-3.3.3 2.1-1.5 4.3-4.3 3.3z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Download on the</p>
                    <p className="font-bold text-gray-900 text-sm">App Store</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-xl hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.39 12l2.308-2.491zm-3.199-3.198L5.764 2.576l10.937 6.333-2.302 2.302-2.807-1.626z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Get it on</p>
                    <p className="font-bold text-gray-900 text-sm">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl" />
                <div className="relative w-64 h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl p-3 overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
                    <div className="p-5 pt-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Deliver to</p>
                          <p className="text-white text-sm font-semibold">
                            New York, NY
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">F</span>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-4">
                        <p className="text-gray-400 text-xs mb-1">Search</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-8 bg-white/10 rounded-lg" />
                          <div className="w-8 h-8 rounded-lg bg-orange-500" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 mb-4">
                        <p className="text-white text-xs opacity-80">
                          Today's Offer
                        </p>
                        <p className="text-white text-lg font-bold">50% OFF</p>
                        <p className="text-white text-xs opacity-80">
                          First order
                        </p>
                      </div>

                      <p className="text-white text-sm font-semibold mb-2">
                        Popular near you
                      </p>
                      <div className="space-y-2">
                        {[
                          { name: 'Burger Republic', price: '$12.99' },
                          { name: 'Sakura Sushi', price: '$18.99' },
                          { name: 'Pizza Paradiso', price: '$14.99' },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700" />
                            <div className="flex-1">
                              <p className="text-white text-xs font-medium">
                                {item.name}
                              </p>
                              <p className="text-orange-400 text-xs">
                                {item.price}
                              </p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                              <span className="text-orange-400 text-xs">+</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 top-20 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2 animate-in fade-in slide-in-from-right duration-700">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Arriving in</p>
                    <p className="font-bold text-gray-900 text-sm">12 min</p>
                  </div>
                </div>

                <div className="absolute -left-6 bottom-32 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2 animate-in fade-in slide-in-from-left duration-700">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">You earned</p>
                    <p className="font-bold text-gray-900 text-sm">250 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
