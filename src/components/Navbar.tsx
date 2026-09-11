import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MapPin, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onSearchChange: (query: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Restaurants', 'Offers', 'About', 'Contact'];

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
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <ShoppingBag className={`w-5 h-5 text-white`} />
              </div>
              <span
                className={`text-xl font-bold transition-colors ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Food<span className="text-orange-500">Go</span>
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                    scrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className={`relative p-2 rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-in fade-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>New York</span>
              </button>

              <button className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all">
                Sign In
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-gray-900">
                  Food<span className="text-orange-500">Go</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
              <button className="w-full mt-6 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md">
                Sign In
              </button>
              <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Delivering to New York</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
