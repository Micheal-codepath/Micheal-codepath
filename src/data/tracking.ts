import {
  ClipboardCheck,
  CookingPot,
  ShoppingBag,
  Bike,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react';

export interface OrderItemSnapshot {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderSnapshot {
  ref: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  area: string;
  notes: string;
  placedAt: number;
}

export interface TrackingStage {
  id: string;
  label: string;
  message: string;
  icon: LucideIcon;
}

export const trackingStages: TrackingStage[] = [
  {
    id: 'confirmed',
    label: 'Order confirmed',
    message: 'The restaurant has received your order.',
    icon: ClipboardCheck,
  },
  {
    id: 'preparing',
    label: 'Preparing your food',
    message: 'The kitchen is cooking your meal fresh.',
    icon: CookingPot,
  },
  {
    id: 'picked-up',
    label: 'Rider picked up',
    message: 'Your rider collected the order from the restaurant.',
    icon: ShoppingBag,
  },
  {
    id: 'on-the-way',
    label: 'Rider is on the way',
    message: 'Your food is moving towards your address.',
    icon: Bike,
  },
  {
    id: 'delivered',
    label: 'Delivered',
    message: 'Enjoy your meal!',
    icon: PartyPopper,
  },
];

export interface RiderInfo {
  name: string;
  initials: string;
  vehicle: string;
  plate: string;
  rating: number;
  deliveries: string;
}

export const riderInfo: RiderInfo = {
  name: 'Emeka A.',
  initials: 'EA',
  vehicle: 'Motorbike • Honda CG 125',
  plate: 'KJA-234XY',
  rating: 4.9,
  deliveries: '2,300+ deliveries',
};

export const riderReplies: string[] = [
  'Hello! I have your order and I am close by.',
  'I am on my way — please keep your phone nearby.',
  'I have arrived! I am waiting at the address you gave.',
];
