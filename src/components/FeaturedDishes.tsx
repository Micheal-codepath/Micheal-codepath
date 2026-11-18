import { useState, useMemo } from 'react';
import { Star, Plus, Flame, Leaf, Minus, Clock, SearchX, X } from 'lucide-react';
import { dishes, categories } from '@/data/mockData';
import { formatNaira } from '@/utils/pricing';
import { useCart } from '@/context/CartContext';
import FoodImage from '@/components/FoodImage';
import Reveal from '@/components/Reveal';

interface FeaturedDishesProps {
  selectedCategory: string | null;
  restaurantFilter: string | null;
  searchQuery: string;
  onClearCategory: () => void;
  onClearRestaurant: () => void;
  onClearSearch: () => void;
}

export default function FeaturedDishes({
  selectedCategory,
  restaurantFilter,
  searchQuery,
  onClearCategory,
  onClearRestaurant,
  onClearSearch,
}: FeaturedDishesProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let result = dishes;

    if (selectedCategory) {
      result = result.filter((d) => d.category === selectedCategory);
    }

    if (restaurantFilter) {
      result = result.filter((d) => d.restaurant === restaurantFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.restaurant.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q),
      );
    }

    return result;
  }, [selectedCategory, restaurantFilter, searchQuery]);

  const displayed = showAll ? filtered : filtered.slice(0, 8);
  const hasFilters = selectedCategory !== null || restaurantFilter !== null || searchQuery !== '';

  const getQuantity = (id: string) =>
    items.find((item) => item.id === id)?.quantity ?? 0;

  const categoryName = selectedCategory
    ? (categories.find((c) => c.id === selectedCategory)?.name ?? '')
    : '';

  const clearAll = () => {
    onClearCategory();
    onClearRestaurant();
    onClearSearch();
    setShowAll(false);
  };

  return (
    <section id="meals" className="py-20 bg-stone-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            {searchQuery ? (
              <>
                Results for “{searchQuery}”
              </>
            ) : restaurantFilter ? (
              <>{restaurantFilter}</>
            ) : selectedCategory ? (
              <>{categoryName}</>
            ) : (
              <>Meals people love</>
            )}
          </h2>
          <p className="text-stone-500 mt-2 max-w-lg mx-auto">
            {filtered.length} dish{filtered.length === 1 ? '' : 'es'}
            {hasFilters ? ' match your filters' : ' across Lagos kitchens'}.
            Add them to your cart and check out in seconds.
          </p>

          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {selectedCategory && (
                <button
                  onClick={onClearCategory}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-800 text-sm font-medium rounded-full hover:bg-orange-200 transition-colors"
                >
                  {categoryName} <X className="w-3.5 h-3.5" />
                </button>
              )}
              {restaurantFilter && (
                <button
                  onClick={onClearRestaurant}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full hover:bg-emerald-200 transition-colors"
                >
                  {restaurantFilter} <X className="w-3.5 h-3.5" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-200 text-stone-700 text-sm font-medium rounded-full hover:bg-stone-300 transition-colors"
                >
                  “{searchQuery}” <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </Reveal>

        {filtered.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200 flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              No meals found
            </h3>
            <p className="text-stone-500 mb-6">
              Try a different search, or clear your filters to browse all 24
              dishes.
            </p>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayed.map((dish) => {
                const qty = getQuantity(dish.id);
                return (
                  <article
                    key={dish.id}
                    className="group bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <FoodImage
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {dish.popular && (
                          <span className="px-2.5 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow-md">
                            Popular
                          </span>
                        )}
                        {dish.spicy && (
                          <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Spicy
                          </span>
                        )}
                        {dish.vegetarian && (
                          <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                            <Leaf className="w-3 h-3" /> Veg
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 rounded-full flex items-center gap-1 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-stone-800">
                          {dish.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-orange-600 font-semibold mb-1">
                        {dish.restaurant}
                      </p>
                      <h3 className="font-bold text-stone-900 text-base mb-1.5 leading-snug">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed mb-3 line-clamp-2">
                        {dish.description}
                      </p>
                      <p className="text-xs text-stone-400 flex items-center gap-1 mb-4">
                        <Clock className="w-3.5 h-3.5" /> {dish.time}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-lg font-extrabold text-stone-900 whitespace-nowrap">
                          {formatNaira(dish.price)}
                        </span>

                        {qty === 0 ? (
                          <button
                            onClick={() => addItem(dish)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:scale-95 transition-all"
                            aria-label={`Add ${dish.name} to cart`}
                          >
                            <Plus className="w-4 h-4" /> Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(dish.id, -1)}
                              className="w-8 h-8 rounded-md bg-white text-orange-700 flex items-center justify-center hover:bg-orange-100 transition-colors shadow-sm"
                              aria-label={`Remove one ${dish.name}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-orange-700 w-6 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => addItem(dish)}
                              className="w-8 h-8 rounded-md bg-white text-orange-700 flex items-center justify-center hover:bg-orange-100 transition-colors shadow-sm"
                              aria-label={`Add another ${dish.name}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            </Reveal>

            {filtered.length > 8 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 bg-white border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-100 transition-colors"
                >
                  {showAll ? 'Show Less' : `View All ${filtered.length} Dishes`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
