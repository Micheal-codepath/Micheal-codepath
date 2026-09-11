import {
  Sandwich,
  Pizza,
  Soup,
  Salad,
  CakeSlice,
  Croissant,
  Beef,
  Coffee,
  Fish,
  Flame,
  Star,
  Clock,
  Leaf,
  Award,
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: typeof Sandwich;
  count: number;
  color: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: string;
  image: string;
  tags: string[];
  priceRange: string;
  featured: boolean;
}

export interface Dish {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  popular: boolean;
  spicy: boolean;
  vegetarian: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  color: string;
  textColor: string;
  icon: typeof Flame;
}

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: Sandwich, count: 142, color: 'bg-orange-100 text-orange-600' },
  { id: 'pizza', name: 'Pizza', icon: Pizza, count: 98, color: 'bg-red-100 text-red-600' },
  { id: 'sushi', name: 'Sushi', icon: Fish, count: 67, color: 'bg-blue-100 text-blue-600' },
  { id: 'salads', name: 'Healthy', icon: Salad, count: 84, color: 'bg-green-100 text-green-600' },
  { id: 'desserts', name: 'Desserts', icon: CakeSlice, count: 56, color: 'bg-pink-100 text-pink-600' },
  { id: 'mexican', name: 'Mexican', icon: Croissant, count: 43, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'asian', name: 'Asian', icon: Soup, count: 112, color: 'bg-teal-100 text-teal-600' },
  { id: 'coffee', name: 'Coffee', icon: Coffee, count: 78, color: 'bg-amber-100 text-amber-700' },
  { id: 'steak', name: 'Steak', icon: Beef, count: 34, color: 'bg-rose-100 text-rose-600' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger Republic',
    cuisine: 'American • Burgers',
    rating: 4.8,
    reviews: 2341,
    deliveryTime: '20-30 min',
    deliveryFee: 'Free',
    image: 'https://images.pexels.com/photos/13916440/pexels-photo-13916440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Free Delivery', 'Popular'],
    priceRange: '$$',
    featured: true,
  },
  {
    id: 'r2',
    name: 'Pizza Paradiso',
    cuisine: 'Italian • Pizza',
    rating: 4.7,
    reviews: 1876,
    deliveryTime: '25-40 min',
    deliveryFee: '$2.99',
    image: 'https://images.pexels.com/photos/19786235/pexels-photo-19786235.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['New'],
    priceRange: '$$',
    featured: true,
  },
  {
    id: 'r3',
    name: 'Sakura Sushi',
    cuisine: 'Japanese • Sushi',
    rating: 4.9,
    reviews: 3201,
    deliveryTime: '30-45 min',
    deliveryFee: 'Free',
    image: 'https://images.pexels.com/photos/1028429/pexels-photo-1028429.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Top Rated', 'Free Delivery'],
    priceRange: '$$$',
    featured: true,
  },
  {
    id: 'r4',
    name: 'Green Bowl Kitchen',
    cuisine: 'Healthy • Salads',
    rating: 4.6,
    reviews: 1432,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    image: 'https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Healthy'],
    priceRange: '$$',
    featured: true,
  },
  {
    id: 'r5',
    name: 'El Toro Cantina',
    cuisine: 'Mexican • Tacos',
    rating: 4.7,
    reviews: 1987,
    deliveryTime: '20-35 min',
    deliveryFee: 'Free',
    image: 'https://images.pexels.com/photos/38932103/pexels-photo-38932103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Popular'],
    priceRange: '$$',
    featured: true,
  },
  {
    id: 'r6',
    name: 'Noodle House',
    cuisine: 'Asian • Noodles',
    rating: 4.5,
    reviews: 1123,
    deliveryTime: '25-35 min',
    deliveryFee: '$2.49',
    image: 'https://images.pexels.com/photos/4223948/pexels-photo-4223948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['New'],
    priceRange: '$',
    featured: true,
  },
  {
    id: 'r7',
    name: 'Sweet Tooth Bakery',
    cuisine: 'Desserts • Bakery',
    rating: 4.9,
    reviews: 2876,
    deliveryTime: '15-25 min',
    deliveryFee: 'Free',
    image: 'https://images.pexels.com/photos/39240989/pexels-photo-39240989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Top Rated'],
    priceRange: '$$',
    featured: true,
  },
  {
    id: 'r8',
    name: 'Grill Master',
    cuisine: 'Steakhouse • Grill',
    rating: 4.8,
    reviews: 1654,
    deliveryTime: '30-45 min',
    deliveryFee: '$3.99',
    image: 'https://images.pexels.com/photos/36734922/pexels-photo-36734922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tags: ['Premium'],
    priceRange: '$$$',
    featured: true,
  },
];

export const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Classic Cheeseburger',
    restaurant: 'Burger Republic',
    price: 12.99,
    image: 'https://images.pexels.com/photos/8228281/pexels-photo-8228281.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    category: 'burgers',
    description: 'Juicy beef patty, melted cheddar, crispy lettuce, tomato, and house sauce on a brioche bun.',
    popular: true,
    spicy: false,
    vegetarian: false,
  },
  {
    id: 'd2',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Paradiso',
    price: 14.99,
    image: 'https://images.pexels.com/photos/31969434/pexels-photo-31969434.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    category: 'pizza',
    description: 'Fresh mozzarella, basil, San Marzano tomato sauce, and extra virgin olive oil.',
    popular: true,
    spicy: false,
    vegetarian: true,
  },
  {
    id: 'd3',
    name: 'Dragon Roll Sushi',
    restaurant: 'Sakura Sushi',
    price: 18.99,
    image: 'https://images.pexels.com/photos/11064614/pexels-photo-11064614.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    category: 'sushi',
    description: 'Shrimp tempura, avocado, eel sauce, and tobiko wrapped in seasoned rice.',
    popular: true,
    spicy: false,
    vegetarian: false,
  },
  {
    id: 'd4',
    name: 'Avocado Power Bowl',
    restaurant: 'Green Bowl Kitchen',
    price: 11.99,
    image: 'https://images.pexels.com/photos/13803823/pexels-photo-13803823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    category: 'salads',
    description: 'Grilled chicken, avocado, quinoa, mixed greens, and citrus vinaigrette.',
    popular: true,
    spicy: false,
    vegetarian: false,
  },
  {
    id: 'd5',
    name: 'Spicy Chicken Tacos',
    restaurant: 'El Toro Cantina',
    price: 10.99,
    image: 'https://images.pexels.com/photos/36498696/pexels-photo-36498696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    category: 'mexican',
    description: 'Three crispy chicken tacos with guacamole, pico de gallo, and chipotle crema.',
    popular: true,
    spicy: true,
    vegetarian: false,
  },
  {
    id: 'd6',
    name: 'Tonkotsu Ramen',
    restaurant: 'Noodle House',
    price: 13.99,
    image: 'https://images.pexels.com/photos/30856693/pexels-photo-30856693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    category: 'asian',
    description: 'Rich pork bone broth, chashu pork, soft-boiled egg, nori, and green onions.',
    popular: true,
    spicy: false,
    vegetarian: false,
  },
  {
    id: 'd7',
    name: 'Matcha Cake Slice',
    restaurant: 'Sweet Tooth Bakery',
    price: 7.99,
    image: 'https://images.pexels.com/photos/39240989/pexels-photo-39240989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    category: 'desserts',
    description: 'Premium matcha sponge layered with cream cheese frosting and white chocolate.',
    popular: true,
    spicy: false,
    vegetarian: true,
  },
  {
    id: 'd8',
    name: 'Grilled Ribeye Steak',
    restaurant: 'Grill Master',
    price: 24.99,
    image: 'https://images.pexels.com/photos/38895885/pexels-photo-38895885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    category: 'steak',
    description: '12oz ribeye with herb butter, roasted vegetables, and peppercorn sauce.',
    popular: true,
    spicy: false,
    vegetarian: false,
  },
  {
    id: 'd9',
    name: 'Crispy Hot Wings',
    restaurant: 'Burger Republic',
    price: 9.99,
    image: 'https://images.pexels.com/photos/27668695/pexels-photo-27668695.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    category: 'burgers',
    description: 'Eight crispy wings tossed in buffalo sauce with blue cheese dip.',
    popular: false,
    spicy: true,
    vegetarian: false,
  },
  {
    id: 'd10',
    name: 'Cappuccino',
    restaurant: 'Sweet Tooth Bakery',
    price: 4.99,
    image: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    category: 'coffee',
    description: 'Double espresso with steamed milk and velvety microfoam latte art.',
    popular: false,
    spicy: false,
    vegetarian: true,
  },
  {
    id: 'd11',
    name: 'Fresh Garden Salad',
    restaurant: 'Green Bowl Kitchen',
    price: 8.99,
    image: 'https://images.pexels.com/photos/13350113/pexels-photo-13350113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    category: 'salads',
    description: 'Mixed greens, cherry tomatoes, cucumber, red onion, and balsamic dressing.',
    popular: false,
    spicy: false,
    vegetarian: true,
  },
  {
    id: 'd12',
    name: 'Salmon Sashimi Set',
    restaurant: 'Sakura Sushi',
    price: 16.99,
    image: 'https://images.pexels.com/photos/11064619/pexels-photo-11064619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    category: 'sushi',
    description: 'Six pieces of premium salmon sashimi with wasabi and pickled ginger.',
    popular: false,
    spicy: false,
    vegetarian: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Michael Chen',
    role: 'Food Blogger',
    avatar: 'https://images.pexels.com/photos/3228887/pexels-photo-3228887.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'FoodGo has completely changed how I order food. The variety is incredible and delivery is always faster than estimated. The app is so easy to use!',
  },
  {
    id: 't2',
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    avatar: 'https://images.pexels.com/photos/3290499/pexels-photo-3290499.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'I order lunch at work every day through FoodGo. The live order tracking is a game changer — I know exactly when to head to the lobby. Best delivery app by far.',
  },
  {
    id: 't3',
    name: 'David Martinez',
    role: 'Software Engineer',
    avatar: 'https://images.pexels.com/photos/6605420/pexels-photo-6605420.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'The deals and offers section saves me so much money. I found my favorite local sushi place through FoodGo and now I am a regular. Highly recommend!',
  },
  {
    id: 't4',
    name: 'Emma Wilson',
    role: 'Fitness Coach',
    avatar: 'https://images.pexels.com/photos/29852852/pexels-photo-29852852.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'As someone who eats healthy, the filter options are perfect. I can find vegetarian and low-calorie options instantly. The salad bowls are always fresh.',
  },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    title: '50% OFF First Order',
    description: 'New users get half off their first delivery. No minimum order required.',
    discount: '50% OFF',
    code: 'WELCOME50',
    color: 'from-orange-500 to-red-500',
    textColor: 'text-white',
    icon: Flame,
  },
  {
    id: 'o2',
    title: 'Free Delivery Weekend',
    description: 'Enjoy zero delivery fees on all orders this weekend. Order from any restaurant.',
    discount: 'FREE DELIVERY',
    code: 'WEEKENDFREE',
    color: 'from-emerald-500 to-teal-600',
    textColor: 'text-white',
    icon: Clock,
  },
  {
    id: 'o3',
    title: 'Buy 1 Get 1 Free',
    description: 'On selected menu items at participating restaurants. Limited time only.',
    discount: 'BOGO',
    code: 'BOGO2026',
    color: 'from-violet-500 to-purple-600',
    textColor: 'text-white',
    icon: Star,
  },
];

export const stats = [
  { label: 'Restaurants', value: '2,500+', icon: Award },
  { label: 'Cities Served', value: '120+', icon: Star },
  { label: 'Daily Orders', value: '50K+', icon: Clock },
  { label: 'Happy Customers', value: '1M+', icon: Leaf },
];
