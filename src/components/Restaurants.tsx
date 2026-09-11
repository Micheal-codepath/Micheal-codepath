import { useState, useMemo } from 'react';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { restaurants } from '@/data/mockData';

interface RestaurantsProps {
  searchQuery: string;
}

export default function Restaurants({ searchQuery }: RestaurantsProps) {
  const [filter, setFilter] = useState<'all' | 'free' | 'top' | 'fast'>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = restaurants;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
      );
    }

    if (filter === 'free') result = result.filter((r) => r.deliveryFee === 'Free');
    if (filter === 'top') result = result.filter((r) => r.rating >= 4.8);
    if (filter === 'fast')
      result = result.filter((r) => parseInt(r.deliveryTime) <= 25);

    return result;
  }, [filter, searchQuery]);

  const filters = [
    { id: 'all' as const, label: 'All' },
    { id: 'free' as const, label: 'Free Delivery' },
    { id: 'top' as const, label: 'Top Rated' },
    { id: 'fast' as const, label: 'Fastest' },
  ];

  return (
    <section id="restaurants" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Featured
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Popular Restaurants
            </h2>
            <p className="text-gray-500 mt-2">
              {filtered.length} restaurants found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No restaurants match your search. Try a different term.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button
                    onClick={() => toggleFavorite(restaurant.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(restaurant.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {restaurant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-xs font-semibold text-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {restaurant.name}
                    </h3>
                    <span className="text-sm font-bold text-gray-700">
                      {restaurant.priceRange}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {restaurant.cuisine}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800">
                        {restaurant.rating}
                      </span>
                      <span className="text-gray-400">
                        ({restaurant.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span
                        className={`font-medium ${
                          restaurant.deliveryFee === 'Free'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {restaurant.deliveryFee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
