import { useState, useMemo } from 'react';
import { Star, Plus, Flame, Leaf, Minus } from 'lucide-react';
import { dishes } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

interface FeaturedDishesProps {
  selectedCategory: string | null;
  searchQuery: string;
}

export default function FeaturedDishes({
  selectedCategory,
  searchQuery,
}: FeaturedDishesProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let result = dishes;

    if (selectedCategory) {
      result = result.filter((d) => d.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.restaurant.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const displayed = showAll ? filtered : filtered.slice(0, 8);

  const getQuantity = (id: string) =>
    items.find((item) => item.id === id)?.quantity || 0;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Trending Now
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Popular Dishes
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Most ordered dishes this week. Add them to your cart and check out
            in seconds.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No dishes found. Try a different category or search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayed.map((dish) => {
                const qty = getQuantity(dish.id);
                return (
                  <div
                    key={dish.id}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {dish.popular && (
                          <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-md">
                            Popular
                          </span>
                        )}
                        {dish.spicy && (
                          <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Spicy
                          </span>
                        )}
                        {dish.vegetarian && (
                          <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                            <Leaf className="w-3 h-3" /> Veg
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-1 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-gray-800">
                          {dish.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-orange-500 font-medium mb-1">
                        {dish.restaurant}
                      </p>
                      <h3 className="font-bold text-gray-900 text-base mb-1.5">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {dish.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${dish.price.toFixed(2)}
                        </span>

                        {qty === 0 ? (
                          <button
                            onClick={() => addItem(dish)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
                          >
                            <Plus className="w-4 h-4" /> Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(dish.id, -1)}
                              className="w-8 h-8 rounded-md bg-white text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors shadow-sm"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-orange-600 w-6 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => addItem(dish)}
                              className="w-8 h-8 rounded-md bg-white text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length > 8 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
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
