import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const API_BASE_URL = 'http://localhost:3000/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error('Backend unreachable');
        const json = await res.json();
        setFeaturedProducts(json.data.slice(0, 4));
      } catch (err) {
        // Mock data fallback
        setFeaturedProducts([
          { id: 1, title: "Modern Lamp", price: 45.00, image: "", category: "home", rating: 4.5, description: "Elegant lighting for any room." },
          { id: 2, title: "Leather Wallet", price: 35.00, image: "", category: "accessories", rating: 4.8, description: "Premium leather wallet." },
          { id: 3, title: "Smart Band", price: 29.99, image: "", category: "electronics", rating: 4.2, description: "Track your steps daily." },
          { id: 4, title: "Coffee Maker", price: 89.99, image: "", category: "home", rating: 4.7, description: "Brew perfect coffee every time." }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="" 
            alt="Hero background fashion" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col justify-center h-[600px]">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Shop the latest trends in fashion, electronics, and home decor. Quality products at unbeatable prices.
          </p>
          <div>
            <Link to="/shop" className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
            <Truck className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-bold text-gray-900">Free Shipping</h3>
              <p className="text-gray-500 text-sm">On all orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-bold text-gray-900">Secure Payment</h3>
              <p className="text-gray-500 text-sm">100% secure payment</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
            <Clock className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-bold text-gray-900">24/7 Support</h3>
              <p className="text-gray-500 text-sm">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/shop" className="text-primary hover:text-blue-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}