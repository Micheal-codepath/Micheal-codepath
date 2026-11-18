import { MapPin, Mail } from 'lucide-react';
import { areas } from '@/data/mockData';
import Logo from '@/components/Logo';

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
      { label: 'Customer reviews', href: '#reviews' },
      { label: 'Contact us', href: '#contact' },
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
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Your favourite Nigerian meals, delivered hot and fast. Order
              from the best kitchens across Lagos in just a few taps.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Lagos, Nigeria
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                hello@riyaleats.ng
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
            &copy; 2026 RiyalEats. All rights reserved.
          </p>
          <p className="text-sm text-stone-500">
            Prices in Naira (₦).
          </p>
        </div>
      </div>
    </footer>
  );
}
