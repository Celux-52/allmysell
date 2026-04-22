'use client';

import { useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { ExternalLink } from 'lucide-react';

export default function EbayClient({ products }: { products: any[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'ymglobal' | 'triangles-3'>('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.store === activeTab);

  return (
    <div className="w-full mt-8">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slideInUp">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
            activeTab === 'all'
              ? 'bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 scale-105'
              : 'bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-[#252525] border border-[#E8750A]/20'
          }`}
        >
          All Stores
        </button>
        <button
          onClick={() => setActiveTab('ymglobal')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
            activeTab === 'ymglobal'
              ? 'bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 scale-105'
              : 'bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-[#252525] border border-[#E8750A]/20'
          }`}
        >
          YMGlobal Store
        </button>
        <button
          onClick={() => setActiveTab('triangles-3')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
            activeTab === 'triangles-3'
              ? 'bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 scale-105'
              : 'bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-[#252525] border border-[#E8750A]/20'
          }`}
        >
          Triangles-3 Store
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          product.soldOut ? (
            <div
              key={index}
              className="relative bg-stone-50 flex flex-col h-full rounded-xl shadow-lg overflow-hidden border border-stone-200 animate-scaleIn opacity-75"
              style={{ animationDelay: `${(index % 8) * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-transparent/40 z-10 flex items-center justify-center">
                <div className="bg-red-600 text-stone-900 px-6 py-2 rounded-full font-bold text-lg transform -rotate-12 shadow-lg">
                  SOLD OUT
                </div>
              </div>
              <div className="absolute top-3 left-3 z-20 bg-transparent/80 text-stone-900 text-[10px] font-bold px-2 py-1 rounded-full border border-gray-600">
                {product.store === 'triangles-3' ? 'Triangles-3' : 'YMGlobal'}
              </div>
              <div className="relative w-full h-56 bg-white flex-shrink-0 flex items-center justify-center p-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain grayscale opacity-60" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-stone-400 font-semibold mb-2 uppercase tracking-wide">{product.category}</div>
                <h3 className="text-lg font-bold text-stone-500 mb-2 line-clamp-2" title={product.name}>{product.name}</h3>
                <p className="text-stone-400 text-sm mb-4 line-clamp-3 leading-relaxed" title={product.description}>{product.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 mt-auto">
                  <span className="text-red-500 font-semibold text-sm">Sold Out</span>
                  <span className="text-gray-600 text-xs">Temporarily Unavailable</span>
                </div>
              </div>
            </div>
          ) : (
            <TrackedLink
              key={index}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              eventName="ebay_product_click"
              buttonId={`ebay_product_${index}`}
              payload={{ item_name: product.name, item_category: product.category, store: product.store }}
              className="bg-stone-50 flex flex-col h-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group border border-stone-200/60 hover:border-[#E8750A]/40 animate-scaleIn relative"
              style={{ animationDelay: `${(index % 8) * 0.1}s` }}
            >
              <div className="absolute top-3 right-3 z-10 bg-green-500/90 backdrop-blur text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">IN STOCK</div>
              
              {/* Store Badge */}
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                {product.store === 'triangles-3' ? 'Triangles-3' : 'YMGlobal'}
              </div>

              <div className="relative w-full h-56 bg-neutral-900 border-b border-[#222] flex-shrink-0 flex items-center justify-center p-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[11px] text-stone-800 font-bold mb-2 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-base font-bold text-gray-100 mb-2 line-clamp-2 leading-tight group-hover:text-stone-800 transition-colors" title={product.name}>{product.name}</h3>
                <p className="text-stone-500 text-sm mb-4 line-clamp-3 leading-relaxed" title={product.description}>{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-200/60 mt-auto">
                  <span className="text-stone-800 font-semibold text-sm">View on eBay</span>
                  <ExternalLink className="text-stone-800 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={16} />
                </div>
              </div>
            </TrackedLink>
          )
        ))}
      </div>
    </div>
  );
}
