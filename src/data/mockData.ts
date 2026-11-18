import {
  Sandwich,
  Soup,
  Flame,
  Star,
  Globe,
  CookingPot,
  Drumstick,
  Crown,
  CupSoda,
  Bike,
  Store,
  UtensilsCrossed,
  LayoutGrid,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  /** Illustrative delivery fee in Naira. 0 means free delivery. */
  deliveryFee: number;
  image: string;
  tags: string[];
  priceRange: string;
  featured: boolean;
  area: string;
}

export interface Dish {
  id: string;
  name: string;
  restaurant: string;
  /** Price in Nigerian Naira. */
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  popular: boolean;
  spicy: boolean;
  vegetarian: boolean;
  time: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export type PromoKind = 'flat' | 'percent' | 'freeDelivery';

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  color: string;
  icon: LucideIcon;
  kind: PromoKind;
  /** Naira for "flat", percentage for "percent", ignored for "freeDelivery". */
  value: number;
  minSubtotal: number;
}

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

/** Lagos neighbourhoods featured in this frontend concept. */
export const areas: string[] = [
  'Ikeja',
  'Yaba',
  'Lekki',
  'Surulere',
  'Victoria Island',
  'Maryland',
  'Ajah',
];

export const categories: Category[] = [
  { id: 'rice', name: 'Nigerian Rice', icon: CookingPot, color: 'bg-orange-100 text-orange-700' },
  { id: 'swallow', name: 'Swallow & Soups', icon: Soup, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'grills', name: 'Grills & BBQ', icon: Flame, color: 'bg-red-100 text-red-600' },
  { id: 'street', name: 'Street Food', icon: Drumstick, color: 'bg-amber-100 text-amber-700' },
  { id: 'specials', name: 'Naija Specials', icon: Crown, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'fastfood', name: 'Fast Food', icon: Sandwich, color: 'bg-sky-100 text-sky-700' },
  { id: 'international', name: 'International', icon: Globe, color: 'bg-teal-100 text-teal-700' },
  { id: 'drinks', name: 'Drinks & Desserts', icon: CupSoda, color: 'bg-pink-100 text-pink-600' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: "Mama's Kitchen",
    cuisine: 'Nigerian • Rice & Soups',
    rating: 4.8,
    reviews: 842,
    deliveryTime: '25-35 min',
    deliveryFee: 800,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Popular'],
    priceRange: '₦₦',
    featured: true,
    area: 'Ikeja, Lagos',
  },
  {
    id: 'r2',
    name: 'Lagos Chop House',
    cuisine: 'Nigerian • Grills & Specials',
    rating: 4.7,
    reviews: 613,
    deliveryTime: '30-40 min',
    deliveryFee: 1200,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tags: ["Chef's Pick"],
    priceRange: '₦₦₦',
    featured: true,
    area: 'Victoria Island, Lagos',
  },
  {
    id: 'r3',
    name: 'The Jollof Spot',
    cuisine: 'Nigerian • Rice & Parties',
    rating: 4.9,
    reviews: 957,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    tags: ['Free Delivery', 'Top Rated'],
    priceRange: '₦₦',
    featured: true,
    area: 'Yaba, Lagos',
  },
  {
    id: 'r4',
    name: 'Naija Grill House',
    cuisine: 'Grills • Suya & BBQ',
    rating: 4.8,
    reviews: 728,
    deliveryTime: '25-35 min',
    deliveryFee: 1000,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
    tags: ['Smoky'],
    priceRange: '₦₦',
    featured: true,
    area: 'Surulere, Lagos',
  },
  {
    id: 'r5',
    name: 'Amala Republic',
    cuisine: 'Nigerian • Swallow & Soups',
    rating: 4.9,
    reviews: 884,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
    image: 'https://images.pexels.com/photos/580700/pexels-photo-580700.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Free Delivery'],
    priceRange: '₦₦',
    featured: true,
    area: 'Maryland, Lagos',
  },
  {
    id: 'r6',
    name: 'The Suya Corner',
    cuisine: 'Street Food • Suya & Boli',
    rating: 4.7,
    reviews: 592,
    deliveryTime: '15-25 min',
    deliveryFee: 900,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    tags: ['Late Night'],
    priceRange: '₦',
    featured: true,
    area: 'Lekki, Lagos',
  },
  {
    id: 'r7',
    name: 'Urban Bites',
    cuisine: 'Fast Food • Shawarma & Burgers',
    rating: 4.6,
    reviews: 431,
    deliveryTime: '15-25 min',
    deliveryFee: 700,
    image: 'https://images.pexels.com/photos/13916440/pexels-photo-13916440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Quick Bites'],
    priceRange: '₦₦',
    featured: false,
    area: 'Ikeja, Lagos',
  },
  {
    id: 'r8',
    name: 'Mainland Kitchen',
    cuisine: 'Nigerian • Home-style Classics',
    rating: 4.6,
    reviews: 388,
    deliveryTime: '25-35 min',
    deliveryFee: 1100,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    tags: ['Home-style'],
    priceRange: '₦₦',
    featured: false,
    area: 'Ajah, Lagos',
  },
  {
    id: 'r9',
    name: 'Oriental Wok',
    cuisine: 'Pan-Asian • Chinese & Japanese',
    rating: 4.7,
    reviews: 356,
    deliveryTime: '30-40 min',
    deliveryFee: 1500,
    image: 'https://images.pexels.com/photos/1028429/pexels-photo-1028429.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['New'],
    priceRange: '₦₦₦',
    featured: false,
    area: 'Victoria Island, Lagos',
  },
  {
    id: 'r10',
    name: 'Bella Italia',
    cuisine: 'Italian • Pasta & Pizza',
    rating: 4.8,
    reviews: 402,
    deliveryTime: '25-35 min',
    deliveryFee: 1300,
    image: 'https://images.pexels.com/photos/19786235/pexels-photo-19786235.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['New'],
    priceRange: '₦₦₦',
    featured: false,
    area: 'Lekki, Lagos',
  },
];

export const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Smoky Party Jollof Rice',
    restaurant: 'The Jollof Spot',
    price: 3500,
    image: 'https://images.pexels.com/photos/17952748/pexels-photo-17952748.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    category: 'rice',
    description: 'Firewood-smoked party jollof with fried plantain and peppered chicken.',
    popular: true,
    spicy: true,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd2',
    name: 'Chicken Fried Rice',
    restaurant: "Mama's Kitchen",
    price: 4000,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'rice',
    description: 'Classic Naija fried rice with liver, mixed vegetables and grilled chicken.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '20-30 min',
  },
  {
    id: 'd3',
    name: 'Ofada Rice & Pepper Stew',
    restaurant: 'Lagos Chop House',
    price: 5500,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/White_Nigeria_rice_with_vegetable_stew.jpg?width=800',
    rating: 4.8,
    category: 'rice',
    description: 'Fragrant local rice with rich pepper stew, tender beef and boiled egg.',
    popular: false,
    spicy: true,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd4',
    name: 'Amala & Ewedu with Assorted Meat',
    restaurant: 'Amala Republic',
    price: 4500,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amala_and_ewedu_soup.jpg?width=800',
    rating: 4.9,
    category: 'swallow',
    description: 'Smooth yam-flour amala with ewedu, gbegiri and tender assorted meat.',
    popular: true,
    spicy: false,
    vegetarian: false,
    time: '20-30 min',
  },
  {
    id: 'd5',
    name: 'Eba & Egusi Soup',
    restaurant: 'Mainland Kitchen',
    price: 4200,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Egusi_and_eba.jpg?width=800',
    rating: 4.8,
    category: 'swallow',
    description: 'Freshly moulded eba with melon-seed egusi, stockfish and ponmo.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '20-30 min',
  },
  {
    id: 'd6',
    name: 'Pounded Yam & Edikang Ikong',
    restaurant: "Mama's Kitchen",
    price: 4800,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Edikang_ikong.jpg?width=800',
    rating: 4.7,
    category: 'swallow',
    description: 'Soft pounded yam with rich vegetable soup, periwinkle and smoked fish.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd7',
    name: 'Beef Suya Platter',
    restaurant: 'The Suya Corner',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    category: 'grills',
    description: 'Flame-grilled beef suya in yaji spice with onions, tomatoes and cabbage.',
    popular: true,
    spicy: true,
    vegetarian: false,
    time: '15-25 min',
  },
  {
    id: 'd8',
    name: 'Barbecue Chicken (Half)',
    restaurant: 'Naija Grill House',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'grills',
    description: 'Half chicken marinated overnight and grilled over open flame with peppers.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd9',
    name: 'Grilled Tilapia Fish',
    restaurant: 'Lagos Chop House',
    price: 8500,
    image: 'https://images.pexels.com/photos/36378583/pexels-photo-36378583.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    category: 'grills',
    description: 'Whole tilapia grilled with pepper sauce, served with lime and onions.',
    popular: true,
    spicy: true,
    vegetarian: false,
    time: '30-40 min',
  },
  {
    id: 'd10',
    name: 'Akara (5 pcs)',
    restaurant: 'Mainland Kitchen',
    price: 1500,
    image: 'https://images.pexels.com/photos/31233606/pexels-photo-31233606.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    category: 'street',
    description: 'Golden bean cakes fried fresh every morning — crisp outside, fluffy inside.',
    popular: false,
    spicy: false,
    vegetarian: true,
    time: '10-20 min',
  },
  {
    id: 'd11',
    name: 'Puff-Puff (8 pcs)',
    restaurant: 'Urban Bites',
    price: 1200,
    image: 'https://images.pexels.com/photos/5779886/pexels-photo-5779886.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    category: 'street',
    description: 'Sweet, pillowy fried dough balls dusted with sugar. Impossible to stop at one.',
    popular: true,
    spicy: false,
    vegetarian: true,
    time: '10-20 min',
  },
  {
    id: 'd12',
    name: 'Boli & Groundnuts',
    restaurant: 'The Suya Corner',
    price: 2000,
    image: 'https://images.pexels.com/photos/16223839/pexels-photo-16223839.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    category: 'street',
    description: 'Fire-roasted plantain with roasted groundnuts and spicy pepper sauce.',
    popular: false,
    spicy: false,
    vegetarian: true,
    time: '15-25 min',
  },
  {
    id: 'd13',
    name: 'Asun (Spicy Goat Meat)',
    restaurant: 'Naija Grill House',
    price: 6500,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Asun.jpg?width=800',
    rating: 4.9,
    category: 'specials',
    description: 'Smoky grilled goat meat tossed in scotch-bonnet pepper sauce with onions.',
    popular: true,
    spicy: true,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd14',
    name: 'Native Rice with Smoked Fish',
    restaurant: "Mama's Kitchen",
    price: 5000,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'specials',
    description: 'Palm-oil native rice with smoked fish, scent leaf and crayfish.',
    popular: false,
    spicy: true,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd15',
    name: 'Nkwobi',
    restaurant: 'Lagos Chop House',
    price: 6000,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nkwobi.jpg?width=800',
    rating: 4.8,
    category: 'specials',
    description: 'Tender cow foot in creamy palm-oil sauce with ugba and garden eggs.',
    popular: false,
    spicy: true,
    vegetarian: false,
    time: '20-30 min',
  },
  {
    id: 'd16',
    name: 'Chicken Shawarma',
    restaurant: 'Urban Bites',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    category: 'fastfood',
    description: 'Juicy chicken shawarma with garlic sauce, chips and pickles in soft pita.',
    popular: true,
    spicy: false,
    vegetarian: false,
    time: '15-25 min',
  },
  {
    id: 'd17',
    name: 'Naija Beef Burger',
    restaurant: 'Urban Bites',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    category: 'fastfood',
    description: 'Flame-grilled beef patty with peppered mayo, plantain chips and fries.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '15-25 min',
  },
  {
    id: 'd18',
    name: 'Meat Lovers Pizza (Medium)',
    restaurant: 'Urban Bites',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'fastfood',
    description: 'Loaded with chicken, beef, sausages and peppers on a crisp base.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd19',
    name: 'Dragon Roll Sushi (8 pcs)',
    restaurant: 'Oriental Wok',
    price: 9800,
    image: 'https://images.pexels.com/photos/11064614/pexels-photo-11064614.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    category: 'international',
    description: 'Tempura prawn and avocado rolls with eel sauce and sesame.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '30-40 min',
  },
  {
    id: 'd20',
    name: 'Creamy Shrimp Pasta',
    restaurant: 'Bella Italia',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'international',
    description: 'Spaghetti in creamy garlic sauce with prawns, cherry tomatoes and basil.',
    popular: false,
    spicy: false,
    vegetarian: false,
    time: '25-35 min',
  },
  {
    id: 'd21',
    name: 'Margherita Pizza (Medium)',
    restaurant: 'Bella Italia',
    price: 6500,
    image: 'https://images.pexels.com/photos/31708263/pexels-photo-31708263.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    category: 'international',
    description: 'Wood-fired base with tomato sugo, fior di latte and fresh basil.',
    popular: true,
    spicy: false,
    vegetarian: true,
    time: '25-35 min',
  },
  {
    id: 'd22',
    name: 'Chilled Zobo (50cl)',
    restaurant: 'The Jollof Spot',
    price: 1000,
    image: 'https://images.pexels.com/photos/31012762/pexels-photo-31012762.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    category: 'drinks',
    description: 'Icy hibiscus drink brewed with ginger, pineapple and cloves.',
    popular: true,
    spicy: false,
    vegetarian: true,
    time: '10-15 min',
  },
  {
    id: 'd23',
    name: 'Chapman (50cl)',
    restaurant: 'Urban Bites',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    category: 'drinks',
    description: "Nigeria's favourite mocktail — cucumber, grenadine and fizzy orange.",
    popular: true,
    spicy: false,
    vegetarian: true,
    time: '10-15 min',
  },
  {
    id: 'd24',
    name: 'Cookies & Cream Sundae',
    restaurant: 'Bella Italia',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'drinks',
    description: 'Vanilla and chocolate scoops with cookie crumble and chocolate sauce.',
    popular: false,
    spicy: false,
    vegetarian: true,
    time: '10-15 min',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Adaeze Okafor',
    role: 'Preview tester • Yaba',
    rating: 5,
    text: 'The jollof selection alone won me over. I found my kind of amala spot within minutes of browsing the sample menus.',
  },
  {
    id: 't2',
    name: 'Tunde Bakare',
    role: 'Preview tester • Ikeja',
    rating: 5,
    text: 'Clean layout, clear prices in naira, and the cart maths actually adds up. This feels built for us.',
  },
  {
    id: 't3',
    name: 'Ngozi Eze',
    role: 'Preview tester • Lekki',
    rating: 4,
    text: 'I love that swallow and soups get their own category. The demo checkout was simple from cart to confirmation.',
  },
  {
    id: 't4',
    name: 'Ibrahim Musa',
    role: 'Preview tester • Surulere',
    rating: 5,
    text: 'Suya, boli and zobo on one platform with honest delivery fees. I am looking forward to the real launch.',
  },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    title: '₦2,000 Off Your First Order',
    description: 'New here? Take ₦2,000 off any order above ₦6,000.',
    discount: '₦2,000 OFF',
    code: 'NAIJA2000',
    color: 'bg-orange-600',
    icon: Flame,
    kind: 'flat',
    value: 2000,
    minSubtotal: 6000,
  },
  {
    id: 'o2',
    title: 'Free Delivery in Lagos',
    description: 'Zero delivery fee on orders above ₦5,000. Applied in your cart.',
    discount: 'FREE DELIVERY',
    code: 'FREESHIP',
    color: 'bg-emerald-700',
    icon: Bike,
    kind: 'freeDelivery',
    value: 0,
    minSubtotal: 5000,
  },
  {
    id: 'o3',
    title: '20% Off This Weekend',
    description: 'A fifth off every meal above ₦4,000, Friday to Sunday.',
    discount: '20% OFF',
    code: 'WEEKEND20',
    color: 'bg-stone-900',
    icon: Star,
    kind: 'percent',
    value: 20,
    minSubtotal: 4000,
  },
];

/** Retired demo codes kept so the cart can explain them as expired. */
export const expiredPromos: { code: string; message: string }[] = [
  {
    code: 'FESTIVE24',
    message: 'FESTIVE24 expired on 31 Dec 2024. Try NAIJA2000 instead.',
  },
];

export const stats: Stat[] = [
  { label: 'Sample restaurants', value: '10', icon: Store },
  { label: 'Sample dishes', value: '24', icon: UtensilsCrossed },
  { label: 'Food categories', value: '8', icon: LayoutGrid },
  { label: 'Lagos areas shown', value: '7', icon: MapPin },
];
