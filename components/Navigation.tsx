'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

const webServices = [
  { name: '🥉 Basic Setup', href: '/web-cozumleri#temel' },
  { name: '🥈 Professional', href: '/web-cozumleri#profesyonel' },
  { name: '🥇 Full Ecosystem', href: '/web-cozumleri#ekosistem' },
  { name: '📞 Get a Quote', href: '/web-cozumleri#iletisim' },
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
    <nav className="bg-[#0A0A0A] shadow-lg shadow-black/50 sticky top-0 z-50 border-b border-[#E8750A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E8750A] to-[#F59E0B] rounded-lg flex items-center justify-center shadow-lg shadow-[#E8750A]/20">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#E8750A] to-[#F59E0B] bg-clip-text text-transparent">
              AllMySell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors font-medium flex items-center gap-1">
                Shop
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-[#1A1A1A] rounded-lg shadow-xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#E8750A]/10">
                {shops.map((shop) => (
                  <Link
                    key={shop.name}
                    href={shop.href}
                    className="block px-4 py-3 text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {shop.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Web Solutions Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors font-medium flex items-center gap-1">
                Web Solutions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-52 bg-[#1A1A1A] rounded-lg shadow-xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#E8750A]/10">
                {webServices.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors first:rounded-t-lg last:rounded-b-lg text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2 rounded-lg text-[#E8750A] hover:bg-[#E8750A]/10 transition-colors font-medium"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white rounded-lg hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/register"
              className="px-3 py-1.5 bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white rounded text-sm hover:shadow-lg transition-all font-medium"
            >
              Sign Up
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:bg-[#E8750A]/20"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#E8750A]/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Shop Menu */}
            <div className="px-2">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="w-full text-left px-2 py-3 rounded-lg text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors font-medium flex items-center justify-between"
              >
                Shop
                <ChevronDown size={16} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <div className="bg-[#1A1A1A] rounded-lg mt-2 space-y-1">
                  {shops.map((shop) => (
                    <Link
                      key={shop.name}
                      href={shop.href}
                      className="block px-4 py-2 text-gray-300 hover:bg-[#E8750A]/20 hover:text-[#E8750A] transition-colors rounded"
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

            {/* Mobile Web Çözümleri */}
            <div className="px-2">
              <Link
                href="/web-cozumleri"
                className="block px-2 py-3 rounded-lg text-[#E8750A] hover:bg-[#E8750A]/20 transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                🌐 Web Solutions
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
