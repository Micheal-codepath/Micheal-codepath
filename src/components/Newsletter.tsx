import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-6">
          <Mail className="w-4 h-4 text-orange-500" />
          <span className="text-orange-600 text-sm font-medium">
            Stay in the loop
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Get exclusive deals in your inbox
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Subscribe to our newsletter for the latest restaurant additions,
          seasonal offers, and members-only promotions.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap"
          >
            {subscribed ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" /> Subscribed!
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
