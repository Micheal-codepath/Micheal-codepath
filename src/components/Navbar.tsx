import { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  MapPin,
  Search,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { areas } from '@/data/mockData';

interface NavbarProps {
  query: string;
  onSearchChange: (query: string) => void;
}

const navLinks = [
  { label: 'Restaurants', href: '#restaurants' },
  { label: 'Meals', href: '#meals' },
  { label: 'Offers', href: '#offers' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ query, onSearchChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [area, setArea] = useState('Lagos');
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onDark = !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-extrabold tracking-tight transition-colors ${
                  onDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                Food<span className="text-orange-600">Go</span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                    onDark ? 'text-white/90' : 'text-stone-700'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  onDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className={`relative p-2 rounded-lg transition-colors ${
                  onDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                aria-label={`Open cart, ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="relative hidden sm:block">
                <button
                  onClick={() => setAreaOpen(!areaOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    onDark
                      ? 'text-white/90 hover:bg-white/10'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                  aria-label="Choose delivery area"
                  aria-expanded={areaOpen}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{area}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
                {areaOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setAreaOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-20">
                      <p className="px-4 py-1.5 text-xs font-semibold text-stone-400">
                        Delivery area (demo)
                      </p>
                      {['Lagos', ...areas].map((a) => (
                        <button
                          key={a}
                          onClick={() => {
                            setArea(a);
                            setAreaOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                        >
                          {a}
                          {area === a && (
                            <Check className="w-4 h-4 text-orange-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <a
                href="#meals"
                className="hidden sm:inline-block px-5 py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors"
              >
                Explore Meals
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  onDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="mt-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  value={query}
                  placeholder="Search jollof, suya, shawarma, restaurants..."
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white rounded-xl shadow-lg border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                {query && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-extrabold text-stone-900">
                  Food<span className="text-orange-600">Go</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-stone-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-stone-700 font-medium rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href="#meals"
                onClick={() => setMobileOpen(false)}
                className="block text-center w-full mt-6 px-5 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 transition-colors"
              >
                Explore Meals
              </a>
              <div className="mt-6 flex items-center gap-2 text-stone-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Showing: {area}, Nigeria (demo)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
