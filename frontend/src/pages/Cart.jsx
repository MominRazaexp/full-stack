import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_BASE_URL = 'https://national-odelle-mohammadkashifsulaiman-f5db89b5.koyeb.app/api';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart })
      });
      if (!response.ok) throw new Error("Checkout failed");
      
      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      alert("Checkout service unavailable in demo mode (backend required).");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={`https://picsum.photos/seed/${item.image}/200/200`} 
                alt={item.title} 
                className="w-24 h-24 object-cover rounded-md"
              />
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <div className="mt-2 text-primary font-bold">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-right min-w-[80px]">
                <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button onClick={clearCart} className="text-red-500 text-sm hover:underline">
            Clear Cart
          </button>
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (Estimated)</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              Checkout <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Secure Checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}
