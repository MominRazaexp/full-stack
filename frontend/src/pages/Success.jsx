import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
      </p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  );
}