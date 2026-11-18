import { Star, Clock, UtensilsCrossed } from 'lucide-react';
import { stats } from '@/data/mockData';
import Reveal from '@/components/Reveal';

export default function Stats() {
  return (
    <section className="py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            Why Lagos orders with RiyalEats
          </h2>
          <p className="text-stone-500 mt-2 max-w-xl mx-auto">
            New kitchens join every week — always something delicious to
            discover.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group text-center p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:shadow-md hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-extrabold text-stone-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal
          delay={200}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-stone-500"
        >
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> 4.8 customer rating
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" /> 30 min avg. delivery
          </span>
          <span className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-orange-600" /> 24+
            signature dishes
          </span>
        </Reveal>
      </div>
    </section>
  );
}
