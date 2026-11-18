import { ShoppingBag, MapPin, Mail } from 'lucide-react';
import { areas } from '@/data/mockData';

const footerSections = [
  {
    title: 'Explore',
    links: [
      { label: 'Categories', href: '#categories' },
      { label: 'Restaurants', href: '#restaurants' },
      { label: 'Meals', href: '#meals' },
      { label: 'Offers', href: '#offers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'How it works', href: '#about' },
      { label: 'Preview reviews', href: '#reviews' },
      { label: 'Launch updates', href: '#contact' },
    ],
  },
  {
    title: 'Lagos areas',
    links: areas.slice(0, 5).map((area) => ({ label: area, href: '#restaurants' })),
  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Food<span className="text-orange-500">Go</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Your favourite Nigerian meals, delivered. This page is a
              frontend concept with sample kitchens, menus and prices — no
              real orders are placed.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Lagos, Nigeria (concept)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                hello@foodgo.ng (demo)
              </p>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm">
            &copy; 2026 FoodGo • Frontend concept. Sample data only.
          </p>
          <p className="text-sm text-stone-500">
            Prices in Naira (₦) are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
