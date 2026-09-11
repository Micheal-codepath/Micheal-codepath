import { useState } from 'react';
import { Search, MapPin, ChevronDown, Star, Clock, TrendingUp } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('New York, NY');

  const popularSearches = ['Pizza', 'Sushi', 'Burgers', 'Healthy', 'Ramen'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-transparent to-red-900/30" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-green-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-white text-sm font-medium">
                Now delivering in 120+ cities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Delicious food,
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                delivered to your door
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-5 duration-700">
              Order from your favorite local restaurants with fast delivery,
              live tracking, and exclusive deals. FoodGo makes every meal
              effortless.
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-6 duration-1000"
            >
              <div className="flex items-center gap-2 px-3 py-2 sm:border-r border-gray-200">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-sm font-medium text-gray-800 focus:outline-none"
                    placeholder="Your address"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 flex-1 px-3 py-2">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search restaurants or dishes"
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap"
              >
                Find Food
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 animate-in fade-in duration-1000">
              <span className="text-gray-400 text-sm">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    onSearch(term);
                  }}
                  className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">4.9/5</p>
                  <p className="text-xs text-gray-400">User Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">25 min</p>
                  <p className="text-xs text-gray-400">Avg Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">2,500+</p>
                  <p className="text-xs text-gray-400">Restaurants</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/13916440/pexels-photo-13916440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Gourmet burger"
                    className="rounded-2xl shadow-2xl w-full h-56 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/1028429/pexels-photo-1028429.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Sushi platter"
                    className="rounded-2xl shadow-2xl w-full h-40 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-12">
                  <img
                    src="https://images.pexels.com/photos/19786235/pexels-photo-19786235.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Fresh pizza"
                    className="rounded-2xl shadow-2xl w-full h-40 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/38932103/pexels-photo-38932103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Mexican tacos"
                    className="rounded-2xl shadow-2xl w-full h-56 object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Delivery in</p>
                  <p className="font-bold text-gray-900 text-lg">25 min</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-1000 delay-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rated</p>
                  <p className="font-bold text-gray-900 text-lg">4.9/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
