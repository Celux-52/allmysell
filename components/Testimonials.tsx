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
    
    // Web3Forms API'sine gönder
    formData.append('access_key', '34abe918-5ec6-4eee-9d32-dac28484c901');
    formData.append('subject', `New Review - ${rating} Stars`);
    formData.append('from_name', 'AllMySell Website');
    
    // Rating'i formData'ya ekle
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 text-center shadow-xl">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Feedback!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Your review has been successfully received. Your valuable feedback is very important to us.
              <br />
              We will review and publish it shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Submit Another Review
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <MessageSquare className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl text-gray-600">
            Have you purchased from us? We'd love to hear about your experience!
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                placeholder="john@example.com"
              />
            </div>

            {/* Product */}
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-900 mb-2">
                Product Purchased
              </label>
              <input
                type="text"
                id="product"
                name="product"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                placeholder="e.g., Magnetic Power Bank 10000mAh"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
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
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-900 mb-2">
                Your Review *
              </label>
              <textarea
                id="review"
                name="review"
                rows={6}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-400"
                placeholder="Tell us about your experience with our product and service..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="text-gray-900 font-semibold mb-1">eBay Store</p>
            <p className="text-gray-600 text-sm">Active Seller</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-gray-900 font-semibold mb-1">Quality Products</p>
            <p className="text-gray-600 text-sm">Tech Accessories</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📞</div>
            <p className="text-gray-900 font-semibold mb-1">Customer Support</p>
            <p className="text-gray-600 text-sm">We're Here to Help</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🚚</div>
            <p className="text-gray-900 font-semibold mb-1">Worldwide Shipping</p>
            <p className="text-gray-600 text-sm">Reliable Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
