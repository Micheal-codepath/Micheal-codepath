import { Search, ShoppingBag, Bike, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/Reveal';

const steps = [
  {
    icon: Search,
    title: 'Choose your food',
    description:
      'Browse menus by category, kitchen or craving — from amala to shawarma.',
    tile: 'bg-orange-600',
  },
  {
    icon: ShoppingBag,
    title: 'Place your order',
    description:
      'Add meals to your cart, apply a promo code and check out in seconds.',
    tile: 'bg-stone-900',
  },
  {
    icon: Bike,
    title: 'Track your rider',
    description:
      'Your rider picks up your food and you follow them all the way to your door.',
    tile: 'bg-emerald-700',
  },
  {
    icon: CheckCircle2,
    title: 'Enjoy your meal',
    description:
      'Hot, fresh and on time. Rate your experience and reorder your favourites.',
    tile: 'bg-amber-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-20 bg-stone-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            How RiyalEats works
          </h2>
          <p className="text-stone-500 mt-3 max-w-lg mx-auto">
            From craving to doorstep in four easy steps. It is that simple.
          </p>
        </Reveal>

        <Reveal delay={100}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group">
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 border-t-2 border-dashed border-stone-300"
                    aria-hidden="true"
                  />
                )}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center h-full">
                  <div
                    className={`w-20 h-20 rounded-2xl ${step.tile} flex items-center justify-center mx-auto mb-4 shadow-md`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-stone-900 text-white text-sm font-bold flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-stone-900 text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
