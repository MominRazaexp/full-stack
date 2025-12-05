import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const API_BASE_URL = 'https://national-odelle-mohammadkashifsulaiman-f5db89b5.koyeb.app/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error("API Error");
        const json = await res.json();
        setProducts(json.data);
        setFilteredProducts(json.data);
      } catch (err) {
        // Mock fallback
        const mocks = [
          { id: 1, title: "Classic Sneakers", price: 89.99, category: "footwear", image: "", rating: 4.5, description: "Comfortable daily wear." },
          { id: 2, title: "Leather Bag", price: 129.50, category: "accessories", image: "", rating: 4.8, description: "Stylish leather bag." },
          { id: 3, title: "Headphones", price: 249.00, category: "electronics", image: "", rating: 4.7, description: "Noise cancelling." },
          { id: 4, title: "Smart Watch", price: 199.99, category: "electronics", image: "", rating: 4.2, description: "Stay connected." },
          { id: 5, title: "Denim Jacket", price: 75.00, category: "clothing", image: "", rating: 4.4, description: "Classic look." },
          { id: 6, title: "Coffee Mug", price: 15.00, category: "home", image: "", rating: 4.9, description: "Morning essential." }
        ];
        setProducts(mocks);
        setFilteredProducts(mocks);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (sort === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [category, search, sort, products]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort */}
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-md capitalize transition-colors ${category === cat ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

}
