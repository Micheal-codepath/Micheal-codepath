import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

/**
 * Image with a graceful fallback: if the remote photo fails to load,
 * render a labelled placeholder instead of a broken image icon.
 */
export default function FoodImage({
  src,
  alt,
  className = '',
  eager = false,
}: FoodImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-orange-50 ${className}`}
      >
        <UtensilsCrossed className="h-10 w-10 text-orange-300" />
        <span className="px-3 text-center text-xs font-medium text-orange-500">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
