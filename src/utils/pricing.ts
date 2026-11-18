import type { Offer } from '@/data/mockData';

/** Nigerian Naira sign used across the whole app. */
export const NAIRA = '₦';

/** Format a whole-Naira amount, e.g. 3500 -> "₦3,500". */
export function formatNaira(amount: number): string {
  return `${NAIRA}${Math.round(amount).toLocaleString('en-NG')}`;
}

/** Flat illustrative delivery fee shown in the demo cart (in Naira). */
export const STANDARD_DELIVERY_FEE = 1200;

/** Discounted subtotal at or above which the illustrative fee is waived. */
export const FREE_DELIVERY_THRESHOLD = 15000;

/**
 * Work out the clearly-labelled illustrative delivery fee for the demo cart.
 * Returns 0 for an empty cart, a free-delivery promo, or orders above the
 * free-delivery threshold.
 */
export function illustrativeDeliveryFee(
  subtotalAfterDiscount: number,
  hasFreeDeliveryPromo: boolean,
): number {
  if (subtotalAfterDiscount <= 0) return 0;
  if (hasFreeDeliveryPromo) return 0;
  if (subtotalAfterDiscount >= FREE_DELIVERY_THRESHOLD) return 0;
  return STANDARD_DELIVERY_FEE;
}

export interface ExpiredPromo {
  code: string;
  message: string;
}

export type PromoOutcome =
  | {
      status: 'applied';
      promo: Offer;
      discount: number;
      freeDelivery: boolean;
      message: string;
    }
  | { status: 'invalid' | 'expired' | 'belowMinimum'; message: string };

/** Naira discount a promo takes off a given subtotal (0 for free delivery). */
export function discountFor(promo: Offer, subtotal: number): number {
  if (promo.kind === 'flat') return Math.min(promo.value, subtotal);
  if (promo.kind === 'percent')
    return Math.round((subtotal * promo.value) / 100);
  return 0;
}

/**
 * Validate a demo promo code against the local offer list.
 * Never touches a network; everything is defined in mockData.
 */
export function applyPromoCode(
  rawCode: string,
  subtotal: number,
  promos: Offer[],
  expiredPromos: ExpiredPromo[],
): PromoOutcome {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { status: 'invalid', message: 'Enter a promo code.' };

  const expired = expiredPromos.find((p) => p.code === code);
  if (expired) return { status: 'expired', message: expired.message };

  const promo = promos.find((p) => p.code.toUpperCase() === code);
  if (!promo)
    return {
      status: 'invalid',
      message: `"${code}" is not a valid demo code. Try one from the Offers section.`,
    };

  if (subtotal < promo.minSubtotal)
    return {
      status: 'belowMinimum',
      message: `${promo.code} needs a minimum order of ${formatNaira(promo.minSubtotal)}.`,
    };

  if (promo.kind === 'freeDelivery')
    return {
      status: 'applied',
      promo,
      discount: 0,
      freeDelivery: true,
      message: `${promo.code} applied — free delivery!`,
    };

  return {
    status: 'applied',
    promo,
    discount: discountFor(promo, subtotal),
    freeDelivery: false,
    message: `${promo.code} applied — you save ${formatNaira(discountFor(promo, subtotal))}!`,
  };
}

/** Demo order reference, e.g. "FG-7KQ2XA". Not a real order id. */
export function generateOrderRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = '';
  for (let i = 0; i < 6; i += 1) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return `FG-${ref}`;
}

/** Accepts 0803..., 081..., 090..., 070... and +234 variants. */
export function isValidNigerianPhone(phone: string): boolean {
  return /^(?:\+234|0)[789][01]\d{8}$/.test(phone.replace(/[\s-]/g, ''));
}
