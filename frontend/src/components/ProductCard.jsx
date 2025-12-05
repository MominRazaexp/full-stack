import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative overflow-hidden h-64">
        <img 
          src={`https://picsum.photos/seed/${product.image}/600/400`} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1 text-sm font-semibold text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span>{product.rating}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-4 capitalize">{product.category}</p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        <Link 
          to={`/product/${product.id}`}
          className="mt-3 block text-center w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}