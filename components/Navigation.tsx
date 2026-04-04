'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

const shops = [
  { name: 'eBay', href: '/shop/ebay' },
  { name: 'Amazon', href: '/shop/amazon' },
  { name: 'Etsy', href: '/shop/etsy' },
  { name: 'Shopify', href: '/shop/shopify' },
  { name: 'TikTok Shop', href: '/shop/tiktok' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <nav className="bg-[#1a1a1a] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E07A2C] to-[#8B5A2B] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#E07A2C] to-[#D4A574] bg-clip-text text-transparent">
              AllMySell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#E07A2C]/20 hover:text-[#E07A2C] transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#E07A2C]/20 hover:text-[#E07A2C] transition-colors font-medium flex items-center gap-1">
                Shop
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-[#252525] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {shops.map((shop) => (
                  <Link
                    key={shop.name}
                    href={shop.href}
                    className="block px-4 py-3 text-gray-300 hover:bg-[#E07A2C]/20 hover:text-[#E07A2C] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {shop.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-[#E07A2C]/20"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#E07A2C]/20 hover:text-[#E07A2C] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Shop Menu */}
            <div className="px-2">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="w-full text-left px-2 py-3 rounded-lg text-gray-300 hover:bg-[#E07A2C]/20 hover:text-[#E07A2C] transition-colors font-medium flex items-center justify-between"
              >
                Shop
                <ChevronDown size={16} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <div className="bg-[#252525] rounded-lg mt-2 space-y-1">
                  {shops.map((shop) => (
                    <Link
                      key={shop.name}
                      href={shop.href}
                      className="block px-4 py-2 text-gray-300 hover:bg-[#E07A2C]/20 hover:text-[#E07A2C] transition-colors rounded"
                      onClick={() => {
                        setIsOpen(false);
                        setShopOpen(false);
                      }}
                    >
                      {shop.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
