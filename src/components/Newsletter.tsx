import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('That email address does not look right — check it and try again.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-16">
      <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-6">
          <Mail className="w-4 h-4 text-orange-600" />
          <span className="text-orange-700 text-sm font-medium">
            Tasty updates
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-3">
          Get exclusive deals in your inbox
        </h2>
        <p className="text-stone-500 mb-8 max-w-lg mx-auto">
          New restaurants, fresh dishes and members-only promotions —
          straight to your inbox.
        </p>

        {subscribed ? (
          <div className="max-w-lg mx-auto flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-left animate-in fade-in zoom-in duration-300">
            <span className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </span>
            <div>
              <p className="font-semibold text-emerald-800">
                You are subscribed!
              </p>
              <p className="text-sm text-emerald-700">
                Watch your inbox — fresh deals and new dishes are on the way.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  aria-invalid={error ? 'true' : 'false'}
                  className={`w-full pl-12 pr-4 py-3.5 bg-stone-50 border rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-shadow ${
                    error ? 'border-red-400' : 'border-stone-200'
                  }`}
                />
              </div>
              {error && (
                <p className="flex items-center gap-1.5 text-sm text-red-600 mt-2 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:bg-orange-700 hover:shadow-lg active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-xs text-stone-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </Reveal>
    </section>
  );
}
