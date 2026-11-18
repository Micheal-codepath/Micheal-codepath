import { useState, useMemo } from 'react';
import { Star, Clock, MapPin, Heart, SearchX, ArrowRight } from 'lucide-react';
import { restaurants } from '@/data/mockData';
import { formatNaira } from '@/utils/pricing';
import FoodImage from '@/components/FoodImage';
import Reveal from '@/components/Reveal';

interface RestaurantsProps {
  searchQuery: string;
  onClearSearch: () => void;
  onViewMenu: (restaurantName: string) => void;
}

type Filter = 'all' | 'free' | 'top' | 'fast';

export default function Restaurants({
  searchQuery,
  onClearSearch,
  onViewMenu,
}: RestaurantsProps) {
  const [filter, setFilter] = useState<Filter>('all');
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
          r.cuisine.toLowerCase().includes(q) ||
          r.area.toLowerCase().includes(q),
      );
    }

    if (filter === 'free') result = result.filter((r) => r.deliveryFee === 0);
    if (filter === 'top') result = result.filter((r) => r.rating >= 4.8);
    if (filter === 'fast')
      result = result.filter((r) => parseInt(r.deliveryTime, 10) <= 25);

    return result;
  }, [filter, searchQuery]);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'free', label: 'Free Delivery' },
    { id: 'top', label: 'Top Rated' },
    { id: 'fast', label: 'Fastest' },
  ];

  return (
    <section id="restaurants" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Kitchens around Lagos
            </h2>
            <p className="text-stone-500 mt-2">
              {filtered.length} restaurant
              {filtered.length === 1 ? '' : 's'} near you
              {searchQuery && (
                <>
                  {' '}
                  for “{searchQuery}”{' '}
                  <button
                    onClick={onClearSearch}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    Clear
                  </button>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter restaurants">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                  filter === f.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              No kitchens found
            </h3>
            <p className="text-stone-500 mb-6">
              Nothing on RiyalEats matches “{searchQuery}”. Try jollof,
              suya, or an area like Yaba.
            </p>
            <button
              onClick={onClearSearch}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((restaurant) => (
              <article
                key={restaurant.id}
                className="group bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <FoodImage
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <button
                    onClick={() => toggleFavorite(restaurant.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    aria-label={
                      favorites.has(restaurant.id)
                        ? `Remove ${restaurant.name} from favourites`
                        : `Save ${restaurant.name} to favourites`
                    }
                    aria-pressed={favorites.has(restaurant.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(restaurant.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-stone-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {restaurant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/90 text-xs font-semibold text-stone-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-1.5 gap-2">
                    <h3 className="font-bold text-stone-900 text-lg leading-snug">
                      {restaurant.name}
                    </h3>
                    <span className="text-sm font-bold text-stone-500 whitespace-nowrap">
                      {restaurant.priceRange}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mb-1">
                    {restaurant.cuisine}
                  </p>
                  <p className="text-sm text-stone-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {restaurant.area}
                  </p>

                  <div className="flex items-center gap-1 text-sm mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-stone-800">
                      {restaurant.rating}
                    </span>
                    <span className="text-stone-400">
                      ({restaurant.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-stone-600">
                      <Clock className="w-4 h-4 text-stone-400" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        restaurant.deliveryFee === 0
                          ? 'text-emerald-600'
                          : 'text-stone-600'
                      }`}
                    >
                      {restaurant.deliveryFee === 0
                        ? 'Free'
                        : formatNaira(restaurant.deliveryFee)}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewMenu(restaurant.name)}
                    className="mt-3 w-full py-2.5 rounded-xl bg-orange-50 text-orange-700 text-sm font-semibold hover:bg-orange-100 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    View menu <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
