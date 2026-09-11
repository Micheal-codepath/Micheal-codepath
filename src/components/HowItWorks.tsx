import { Search, ShoppingBag, Bike, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Choose Your Food',
    description:
      'Browse thousands of restaurants and dishes. Filter by cuisine, price, dietary needs, and delivery time.',
    color: 'from-orange-400 to-orange-500',
  },
  {
    icon: ShoppingBag,
    title: 'Place Your Order',
    description:
      'Add items to your cart, apply promo codes, and checkout in seconds. Pay securely with card, Apple Pay, or cash.',
    color: 'from-red-400 to-red-500',
  },
  {
    icon: Bike,
    title: 'Fast Delivery',
    description:
      'Our riders pick up your order and deliver it hot and fresh. Track your delivery in real-time on the map.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: CheckCircle2,
    title: 'Enjoy Your Meal',
    description:
      'Sit back and enjoy restaurant-quality food at home. Rate your experience and earn rewards on every order.',
    color: 'from-blue-400 to-blue-500',
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            How FoodGo Works
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            From craving to cuisine in four easy steps. It is that simple.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 border-t-2 border-dashed border-gray-200" />
                )}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
