'use client';

import { useState } from 'react';
import { Package, Plus, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  active: boolean;
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Starter Plan',
    description: 'Perfect for beginners. Get access to basic product research and 10 AI searches per month.',
    price: 9.99,
    currency: 'USD',
    features: ['10 AI Searches/month', 'Basic Trend Analysis', 'Save up to 25 Products', 'Email Support'],
    active: true,
  },
  {
    id: '2',
    name: 'Pro Plan',
    description: 'For serious sellers. Unlimited AI searches, advanced analytics, and priority support.',
    price: 29.99,
    currency: 'USD',
    features: ['Unlimited AI Searches', 'Advanced Trend Analysis', 'Unlimited Saved Products', 'Competitor Analysis', 'Auto-Generated Listings', 'Priority Support'],
    active: true,
  },
  {
    id: '3',
    name: 'Enterprise Plan',
    description: 'Full automation suite with API access, team features, and dedicated support.',
    price: 79.99,
    currency: 'USD',
    features: ['Everything in Pro', 'API Access', 'Team Management (5 users)', 'Custom Integrations', 'Dedicated Account Manager', 'White-label Reports'],
    active: false,
  },
];

export default function AdminProductsPage() {
  const [products] = useState<Product[]>(defaultProducts);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cornsilk mb-1">Digital Products</h1>
          <p className="text-gray-400 text-sm">Manage SaaS subscription packages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all font-medium text-sm opacity-50 cursor-not-allowed" disabled>
          <Plus size={18} />
          Add Product (Coming Soon)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className={`bg-[#1A1A1A] rounded-xl border ${product.active ? 'border-purple-500/20' : 'border-white/5 opacity-60'} p-6 relative overflow-hidden`}>
            {product.name === 'Pro Plan' && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-bold rounded-full">
                POPULAR
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Package className="text-purple-400" size={20} />
              </div>
              {product.active ? (
                <ToggleRight className="text-emerald-400" size={24} />
              ) : (
                <ToggleLeft className="text-gray-600" size={24} />
              )}
            </div>

            <h3 className="text-xl font-bold text-cornsilk mb-2">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex items-baseline gap-1 mb-6">
              <DollarSign className="text-purple-400" size={18} />
              <span className="text-3xl font-bold text-cornsilk">{product.price}</span>
              <span className="text-gray-500 text-sm">/{product.currency}/mo</span>
            </div>

            <div className="space-y-2">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-[#1A1A1A] rounded-xl border border-white/5 text-center">
        <p className="text-gray-400 text-sm mb-2">💳 Payment integration will be available after Stripe setup</p>
        <p className="text-gray-600 text-xs">Products shown above are templates. They will be stored in the database once connected.</p>
      </div>
    </div>
  );
}
