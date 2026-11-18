import { Search, MapPin, Star, Clock, UtensilsCrossed } from 'lucide-react';
import { areas, dishes } from '@/data/mockData';
import FoodImage from '@/components/FoodImage';

interface HeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmitSearch: (query: string) => void;
  area: string;
  onAreaChange: (area: string) => void;
}

const popularSearches = ['Jollof', 'Suya', 'Amala', 'Shawarma', 'Ofada'];

const heroImages = [
  {
    src: dishes[0].image,
    alt: 'Smoky party jollof rice with plantain',
    tall: true,
  },
  {
    src: dishes[6].image,
    alt: 'Flame-grilled beef suya skewers',
    tall: false,
  },
  {
    src: dishes[8].image,
    alt: 'Grilled tilapia fish',
    tall: false,
  },
  {
    src: dishes[15].image,
    alt: 'Chicken shawarma wrap',
    tall: true,
  },
];

export default function Hero({ query, onQueryChange, onSubmitSearch, area, onAreaChange }: HeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSearch(query);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-stone-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-stone-950" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-orange-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/15 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white text-sm font-medium">
                Lagos • Frontend concept preview
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Your favourite <span className="text-amber-400">Nigerian meals</span>,
              delivered.
            </h1>

            <p className="text-lg text-stone-300 mb-8 max-w-lg mx-auto lg:mx-0">
              From smoky party jollof to freshly made amala, explore sample
              menus from kitchens around Lagos.
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto lg:mx-0"
            >
              <label className="flex items-center gap-2 px-3 py-2 sm:border-r border-stone-200 sm:max-w-44">
                <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="sr-only">Delivery area</span>
                <select
                  value={area}
                  onChange={(e) => onAreaChange(e.target.value)}
                  className="w-full text-sm font-medium text-stone-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}, Lagos
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-2 flex-1 px-3 py-2">
                <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
                <label htmlFor="hero-search" className="sr-only">
                  Search meals or restaurants
                </label>
                <input
                  id="hero-search"
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Try jollof, suya, shawarma..."
                  className="w-full text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-stone-400 text-sm">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => onSubmitSearch(term)}
                  className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-full border border-white/15 hover:bg-white/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#meals"
                className="px-7 py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-colors"
              >
                Explore Meals
              </a>
              <a
                href="#restaurants"
                className="px-7 py-3.5 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                Find Restaurants
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg leading-none">4.8</p>
                  <p className="text-xs text-stone-400 mt-1">Preview rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg leading-none">30 min</p>
                  <p className="text-xs text-stone-400 mt-1">Demo delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg leading-none">24</p>
                  <p className="text-xs text-stone-400 mt-1">Sample dishes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {heroImages.slice(0, 2).map((img) => (
                  <FoodImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    eager
                    className={`rounded-2xl shadow-2xl w-full object-cover ${img.tall ? 'h-56' : 'h-40'}`}
                  />
                ))}
              </div>
              <div className="space-y-4 pt-12">
                {heroImages.slice(2).map((img) => (
                  <FoodImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    eager
                    className={`rounded-2xl shadow-2xl w-full object-cover ${img.tall ? 'h-56' : 'h-40'}`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-stone-500">Demo delivery in</p>
                <p className="font-bold text-stone-900 text-lg leading-tight">30 min</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-stone-500">Preview rating</p>
                <p className="font-bold text-stone-900 text-lg leading-tight">4.8 / 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
