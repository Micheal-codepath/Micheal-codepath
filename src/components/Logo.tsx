interface LogoProps {
  /** "dark" renders the wordmark for dark backgrounds. */
  variant?: 'light' | 'dark';
  /** Compact renders the symbol only, without the wordmark. */
  compact?: boolean;
  markSize?: string;
}

/**
 * RiyalEats brand logo: a serving cloche crowned with a location pin —
 * great food, delivered to exactly where you are.
 */
export default function Logo({ variant = 'light', compact = false, markSize = 'w-10 h-10' }: LogoProps) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 48 48" className={`${markSize} flex-shrink-0 drop-shadow-sm`} role="img" aria-label="RiyalEats logo">
        <rect x="2" y="2" width="44" height="44" rx="13" fill="#EA580C" />
        <path d="M24 6.5c-2.6 0-4.2 1.9-4.2 4 0 3 4.2 6.6 4.2 6.6s4.2-3.6 4.2-6.6c0-2.1-1.6-4-4.2-4z" fill="#fff" />
        <circle cx="24" cy="10.6" r="1.5" fill="#EA580C" />
        <path d="M11 29a13 13 0 0 1 26 0z" fill="#fff" />
        <rect x="9" y="29.5" width="30" height="3.4" rx="1.7" fill="#fff" />
      </svg>
      {!compact && (
        <span
          className={`text-xl font-extrabold tracking-tight ${
            variant === 'dark' ? 'text-white' : 'text-stone-900'
          }`}
        >
          Riyal<span className="text-orange-600">Eats</span>
        </span>
      )}
    </span>
  );
}
