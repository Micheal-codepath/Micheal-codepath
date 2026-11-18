import { useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import { categories, dishes } from '@/data/mockData';
import Reveal from '@/components/Reveal';

interface CategoriesProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function Categories({ selected, onSelect }: CategoriesProps) {
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const dish of dishes) {
      map.set(dish.category, (map.get(dish.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const handleSelect = (id: string | null) => {
    onSelect(id);
    document.getElementById('meals')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories" className="py-20 bg-stone-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Browse by category
            </h2>
            <p className="text-stone-500 mt-2 max-w-lg">
              From party jollof to late-night shawarma — pick a craving and
              see what is cooking.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
        <div className="grid grid-cols-3 lg:grid-cols-9 gap-3 sm:gap-4">
          <button
            onClick={() => handleSelect(null)}
            className={`group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
              selected === null
                ? 'border-orange-600 bg-orange-50 shadow-sm'
                : 'border-stone-200 bg-white hover:border-orange-300'
            }`}
            aria-pressed={selected === null}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-stone-900 flex items-center justify-center text-white">
              <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-stone-700">
              Everything
            </span>
            <span className="text-xs text-stone-400">
              {dishes.length} dishes
            </span>
          </button>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selected === cat.id;
            const count = counts.get(cat.id) ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(isActive ? null : cat.id)}
                className={`group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                  isActive
                    ? 'border-orange-600 bg-orange-50 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-orange-300'
                }`}
                aria-pressed={isActive}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${cat.color}`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-700 text-center leading-tight">
                  {cat.name}
                </span>
                <span className="text-xs text-stone-400">
                  {count} dish{count === 1 ? '' : 'es'}
                </span>
              </button>
            );
          })}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
