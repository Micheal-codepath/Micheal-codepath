import { ShoppingBag, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerSections = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
  },
  {
    title: 'For Restaurants',
    links: ['Add Your Restaurant', 'Business App', 'Restaurant Help', 'Promotions'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Safety', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'],
  },
  {
    title: 'Cities',
    links: ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Food<span className="text-orange-500">Go</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              FoodGo is your go-to platform for fast, reliable food delivery
              from the best local restaurants. Order now and taste the
              difference.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-orange-500 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-orange-500 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; 2026 FoodGo Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Cookies
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
