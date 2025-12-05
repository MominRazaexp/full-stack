import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_BASE_URL = 'http://localhost:3000/api';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error("Not Found");
        const json = await res.json();
        setProduct(json.data);
      } catch (err) {
        // Mock fallback for detail view
        setProduct({ 
          id: parseInt(id), 
          title: "Mock Product", 
          price: 99.99, 
          description: "This is a detailed description of the mock product available in offline mode.", 
          category: "general", 
          image: "", 
          rating: 4.5 
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
          <img 
            src={`https://picsum.photos/seed/${product.image}/800/600`} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">{product.category}</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-gray-500">({product.rating} / 5)</span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
            <br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex items-center justify-between mb-8 border-t border-b py-6">
            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Check className="h-5 w-5" /> In Stock
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 btn-primary py-4 text-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-6 w-6" /> Add to Cart
            </button>
            <button className="flex-1 btn-secondary py-4 text-lg">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}