import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
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

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const restaurantsSection = document.getElementById('restaurants');
    if (restaurantsSection && query) {
      restaurantsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar onSearchChange={handleSearch} />
        <Hero onSearch={handleSearch} />
        <Stats />
        <Categories
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <Restaurants searchQuery={searchQuery} />
        <HowItWorks />
        <Offers />
        <FeaturedDishes
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
        <Testimonials />
        <AppDownload />
        <Newsletter />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
