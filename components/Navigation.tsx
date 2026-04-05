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
            <div className="w-10 h-10 bg-gradient-to-br from-[#8F00FF] to-[#0000FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#8F00FF] to-[#0000FF] bg-clip-text text-transparent">
              AllMySell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#8F00FF]/20 hover:text-[#8F00FF] transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#8F00FF]/20 hover:text-[#8F00FF] transition-colors font-medium flex items-center gap-1">
                Shop
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-[#252525] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {shops.map((shop) => (
                  <Link
                    key={shop.name}
                    href={shop.href}
                    className="block px-4 py-3 text-gray-300 hover:bg-[#8F00FF]/20 hover:text-[#8F00FF] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {shop.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2 rounded-lg text-[#8F00FF] hover:bg-[#8F00FF]/10 transition-colors font-medium"
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 rounded-lg text-[#8F00FF] hover:bg-[#8F00FF]/10 transition-colors font-medium"
            >
              Kayıt Ol
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-[#8F00FF] to-[#0000FF] text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Başlayın
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/register"
              className="px-3 py-1.5 bg-gradient-to-r from-[#8F00FF] to-[#0000FF] text-white rounded text-sm hover:shadow-lg transition-all font-medium"
            >
              Kayıt
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:bg-[#8F00FF]/20"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#8F00FF]/20 hover:text-[#8F00FF] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Shop Menu */}
            <div className="px-2">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="w-full text-left px-2 py-3 rounded-lg text-gray-300 hover:bg-[#8F00FF]/20 hover:text-[#8F00FF] transition-colors font-medium flex items-center justify-between"
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
                      className="block px-4 py-2 text-gray-300 hover:bg-[#8F00FF]/20 hover:text-[#8F00FF] transition-colors rounded"
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
