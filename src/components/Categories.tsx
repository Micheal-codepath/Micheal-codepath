import { categories } from '@/data/mockData';

interface CategoriesProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function Categories({ selected, onSelect }: CategoriesProps) {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Explore
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Browse by Category
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Find exactly what you are craving from our wide selection of cuisines
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          <button
            onClick={() => onSelect(null)}
            className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
              selected === null
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-lg">
              All
            </div>
            <span className="text-sm font-medium text-gray-700">Everything</span>
          </button>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(isActive ? null : cat.id)}
                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${cat.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-400">{cat.count} places</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
