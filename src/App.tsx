import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { useOrderSimulation } from '@/hooks/useOrderSimulation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Categories from '@/components/Categories';
import Restaurants from '@/components/Restaurants';
import HowItWorks from '@/components/HowItWorks';
import Offers from '@/components/Offers';
import FeaturedDishes from '@/components/FeaturedDishes';
import Testimonials from '@/components/Testimonials';
import AppDownload from '@/components/AppDownload';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import OrderTracking from '@/components/OrderTracking';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [restaurantFilter, setRestaurantFilter] = useState<string | null>(null);
  const [area, setArea] = useState('Ikeja');
  const [trackingOpen, setTrackingOpen] = useState(false);
  const simulation = useOrderSimulation();

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewMenu = (restaurantName: string) => {
    setRestaurantFilter(restaurantName);
    setSelectedCategory(null);
    document.getElementById('meals')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrowseFromTracking = () => {
    setTrackingOpen(false);
    requestAnimationFrame(() => {
      document.getElementById('meals')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white font-sans text-stone-900 antialiased">
        <Navbar
          query={searchQuery}
          onSearchChange={handleQueryChange}
          onTrackOrder={() => setTrackingOpen(true)}
        />
        <main>
          <Hero
            query={searchQuery}
            onQueryChange={handleQueryChange}
            onSubmitSearch={handleSearchSubmit}
            area={area}
            onAreaChange={setArea}
          />
          <Stats />
          <Categories
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <Restaurants
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            onViewMenu={handleViewMenu}
          />
          <HowItWorks />
          <Offers />
          <FeaturedDishes
            selectedCategory={selectedCategory}
            restaurantFilter={restaurantFilter}
            searchQuery={searchQuery}
            onClearCategory={() => setSelectedCategory(null)}
            onClearRestaurant={() => setRestaurantFilter(null)}
            onClearSearch={() => setSearchQuery('')}
          />
          <Testimonials />
          <AppDownload />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer
          defaultArea={area}
          onPlaceOrder={simulation.startOrder}
          onTrackOrder={() => setTrackingOpen(true)}
        />
        <OrderTracking
          open={trackingOpen}
          simulation={simulation}
          onClose={() => setTrackingOpen(false)}
          onBrowse={handleBrowseFromTracking}
        />
      </div>
    </CartProvider>
  );
}

export default App;
