import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function Cancel() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <XCircle className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Your payment was canceled. No charges were made.
      </p>
      <Link to="/cart" className="btn-primary">Return to Cart</Link>
    </div>
  );
}