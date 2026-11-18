import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/mockData';

const avatarColors = [
  'bg-orange-100 text-orange-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-teal-100 text-teal-700',
];

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[active];

  return (
    <section id="reviews" className="py-20 bg-stone-950 relative overflow-hidden scroll-mt-16">
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-sm font-semibold mb-2">
            Concept preview
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What our preview testers say
          </h2>
          <p className="text-stone-400 mt-3 max-w-lg mx-auto">
            Sample feedback from friends and food lovers who tried this
            frontend concept. Illustrative, not verified reviews.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 rounded-3xl p-8 sm:p-12 border border-white/10">
            <Quote className="w-12 h-12 text-orange-500/30 mb-4" />

            <div className="min-h-[180px]">
              <div className="flex gap-1 mb-4" aria-label={`Rated ${current.rating} out of 5`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-white leading-relaxed mb-6">
                “{current.text}”
              </p>

              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg ${avatarColors[active % avatarColors.length]}`}
                  aria-hidden="true"
                >
                  {initials(current.name)}
                </div>
                <div>
                  <p className="font-bold text-white">{current.name}</p>
                  <p className="text-sm text-stone-400">{current.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
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
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next testimonial"
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
