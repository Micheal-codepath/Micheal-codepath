import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/mockData';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto">
            Over one million happy customers trust FoodGo for their daily meals
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10">
            <Quote className="w-12 h-12 text-orange-500/30 mb-4" />

            <div className="min-h-[160px]">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-white leading-relaxed mb-6">
                "{testimonials[active].text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[active].avatar}
                  alt={testimonials[active].name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50"
                />
                <div>
                  <p className="font-bold text-white">
                    {testimonials[active].name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {testimonials[active].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === active
                        ? 'w-8 bg-orange-500'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
