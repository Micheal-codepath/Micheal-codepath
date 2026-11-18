import { useState, useEffect, useRef } from 'react';

interface TrackingMapProps {
  /** 0 = at restaurant, 1 = at customer. Driven by the delivery simulation. */
  progress: number;
  restaurantName: string;
  area: string;
}

const ROUTE = 'M 48 248 C 120 244 140 180 205 172 C 270 164 285 120 352 62';
const PICKUP = { x: 48, y: 248 };
const HOME = { x: 352, y: 62 };

/**
 * Stylised local route view. The rider marker is positioned along the route
 * path from the simulation progress — no external map service involved.
 */
export default function TrackingMap({ progress, restaurantName, area }: TrackingMapProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState(PICKUP);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    setLength(total);
    const point = path.getPointAtLength(Math.min(1, Math.max(0, progress)) * total);
    setPos({ x: point.x, y: point.y });
  }, [progress]);

  return (
    <div className="relative">
      <svg viewBox="0 0 400 300" className="w-full h-auto rounded-2xl" role="img" aria-label={`Delivery route from ${restaurantName} to ${area}`}>
        <rect x="0" y="0" width="400" height="300" rx="16" fill="#F5F5F4" />
        {/* city blocks */}
        <rect x="30" y="30" width="90" height="60" rx="8" fill="#E7E5E4" />
        <rect x="150" y="24" width="110" height="52" rx="8" fill="#E7E5E4" />
        <rect x="290" y="100" width="80" height="70" rx="8" fill="#E7E5E4" />
        <rect x="40" y="120" width="80" height="70" rx="8" fill="#E7E5E4" />
        <rect x="150" y="200" width="110" height="70" rx="8" fill="#E7E5E4" />
        <rect x="290" y="200" width="80" height="70" rx="8" fill="#E7E5E4" />
        <rect x="150" y="110" width="70" height="46" rx="8" fill="#D1FAE5" />
        {/* roads */}
        <g stroke="#FFFFFF" strokeWidth="10">
          <line x1="0" y1="105" x2="400" y2="105" />
          <line x1="0" y1="190" x2="400" y2="190" />
          <line x1="135" y1="0" x2="135" y2="300" />
          <line x1="278" y1="0" x2="278" y2="300" />
        </g>
        <g stroke="#E7E5E4" strokeWidth="1.5" strokeDasharray="6 6">
          <line x1="0" y1="105" x2="400" y2="105" />
          <line x1="0" y1="190" x2="400" y2="190" />
          <line x1="135" y1="0" x2="135" y2="300" />
          <line x1="278" y1="0" x2="278" y2="300" />
        </g>

        {/* route casing + base */}
        <path d={ROUTE} fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <path d={ROUTE} fill="none" stroke="#D6D3D1" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 7" />
        {/* travelled portion */}
        <path
          ref={pathRef}
          d={ROUTE}
          fill="none"
          stroke="#EA580C"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={length || undefined}
          strokeDashoffset={length ? length * (1 - Math.min(1, Math.max(0, progress))) : 0}
          style={{ transition: 'stroke-dashoffset 300ms linear' }}
        />

        {/* pickup pin */}
        <g transform={`translate(${PICKUP.x},${PICKUP.y})`}>
          <path d="M0 -26c-7 0-11 5-11 10.5C-11 -8 0 2 0 2s11-10 11-17.5C11 -21 7 -26 0 -26z" fill="#EA580C" />
          <circle cx="0" cy="-15" r="4" fill="#fff" />
        </g>
        {/* home pin */}
        <g transform={`translate(${HOME.x},${HOME.y})`}>
          <path d="M0 -26c-7 0-11 5-11 10.5C-11 -8 0 2 0 2s11-10 11-17.5C11 -21 7 -26 0 -26z" fill="#059669" />
          <circle cx="0" cy="-15" r="4" fill="#fff" />
        </g>

        {/* rider marker */}
        <g
          data-testid="rider-marker"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 300ms linear' }}
        >
          <circle cx="0" cy="0" r="13" fill="#EA580C" opacity="0.2" />
          <circle cx="0" cy="0" r="8" fill="#EA580C" stroke="#fff" strokeWidth="3" />
          <circle cx="0" cy="0" r="2.5" fill="#fff" />
        </g>
      </svg>

      {/* labels */}
      <div className="absolute left-3 bottom-3 max-w-[45%] bg-white/95 rounded-xl px-3 py-2 shadow-md border border-stone-200">
        <p className="text-[11px] font-semibold text-orange-700 uppercase tracking-wide">Pickup</p>
        <p className="text-xs font-bold text-stone-900 truncate">{restaurantName}</p>
      </div>
      <div className="absolute right-3 top-3 max-w-[45%] bg-white/95 rounded-xl px-3 py-2 shadow-md border border-stone-200 text-right">
        <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">Deliver to</p>
        <p className="text-xs font-bold text-stone-900 truncate">Home • {area}</p>
      </div>
      <div className="absolute left-3 top-3 bg-stone-900/85 text-white text-[11px] font-medium rounded-full px-3 py-1.5">
        Route view • Lagos
      </div>
    </div>
  );
}
