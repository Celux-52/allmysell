'use client';

import { useState } from 'react';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Submit to Web3Forms API
    formData.append('access_key', '34abe918-5ec6-4eee-9d32-dac28484c901');
    formData.append('subject', `New Review - ${rating} Stars`);
    formData.append('from_name', 'AllMySell Website');
    
    // Add rating to formData
    formData.append('rating', `${rating} Stars (${'⭐'.repeat(rating)})`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        e.currentTarget.reset();
        setRating(5);
      } else {
        console.error('Web3Forms error:', result);
        alert('There was an error submitting your review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] rounded-2xl p-12 text-center shadow-xl border border-green-500/20">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-cornsilk mb-4">
              Thank You for Your Feedback!
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Your review has been successfully received. Your valuable feedback is very important to us.
              <br />
              We will review and publish it shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all"
            >
              Submit Another Review
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <MessageSquare className="w-16 h-16 text-[#E8750A] mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-cornsilk mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl text-gray-400">
            Have you purchased from us? We'd love to hear about your experience!
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] rounded-2xl p-8 shadow-xl border border-[#E8750A]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all text-cornsilk placeholder-gray-600"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all text-cornsilk placeholder-gray-600"
                placeholder="john@example.com"
              />
            </div>

            {/* Product */}
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-2">
                Product Purchased
              </label>
              <input
                type="text"
                id="product"
                name="product"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all text-cornsilk placeholder-gray-600"
                placeholder="e.g., Magnetic Power Bank 10000mAh"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Rating *
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-2">
                Your Review *
              </label>
              <textarea
                id="review"
                name="review"
                rows={6}
                required
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all resize-none text-cornsilk placeholder-gray-600"
                placeholder="Tell us about your experience with our product and service..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white font-semibold py-4 rounded-lg hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>

            <p className="text-sm text-gray-500 text-center">
              Your review will be verified and published after approval. Thank you for your feedback!
            </p>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🛍️</div>
            <p className="text-cornsilk font-semibold mb-1">eBay Store</p>
            <p className="text-gray-500 text-sm">Active Seller</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-cornsilk font-semibold mb-1">Quality Products</p>
            <p className="text-gray-500 text-sm">Tech Accessories</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📞</div>
            <p className="text-cornsilk font-semibold mb-1">Customer Support</p>
            <p className="text-gray-500 text-sm">We're Here to Help</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🚚</div>
            <p className="text-cornsilk font-semibold mb-1">Worldwide Shipping</p>
            <p className="text-gray-500 text-sm">Reliable Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
