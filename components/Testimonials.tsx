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
    formData.append('access_key', '34abe918-5ec6-4eee-9d32-dac28484c901');
    formData.append('subject', `New Review - ${rating} Stars`);
    formData.append('from_name', 'AllMySell Website');
    formData.append('rating', `${rating} Stars (${'⭐'.repeat(rating)})`);
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) { setIsSubmitted(true); e.currentTarget.reset(); setRating(5); }
      else { alert('There was an error submitting your review. Please try again.'); }
    } catch { alert('There was an error submitting your review. Please try again.'); }
    finally { setIsLoading(false); }
  };

  if (isSubmitted) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-12 text-center border-green-500/20 animate-scale-in">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Thank You for Your Feedback!</h2>
            <p className="text-lg text-slate-400 mb-6">Your review has been successfully received. We will review and publish it shortly.</p>
            <button onClick={() => setIsSubmitted(false)} className="btn-primary"><span>Submit Another Review</span></button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Share Your <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-slate-400">Have you purchased from us? We&apos;d love to hear about your experience!</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-slate-500" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-slate-500" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-slate-300 mb-2">Product Purchased</label>
              <input type="text" id="product" name="product" className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-slate-500" placeholder="e.g., Magnetic Power Bank 10000mAh" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Rating *</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="focus:outline-none transition-transform hover:scale-110">
                    <Star className={`w-10 h-10 ${star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-slate-300 mb-2">Your Review *</label>
              <textarea id="review" name="review" rows={6} required className="w-full px-4 py-3 glass-input rounded-xl resize-none text-white placeholder-slate-500" placeholder="Tell us about your experience..." />
            </div>
            <button type="submit" disabled={isLoading} className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{isLoading ? 'Submitting...' : 'Submit Review'}</span>
            </button>
            <p className="text-sm text-slate-500 text-center">Your review will be verified and published after approval.</p>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { emoji: '🛍️', title: 'eBay Store', sub: 'Active Seller' },
            { emoji: '⭐', title: 'Quality Products', sub: 'Tech Accessories' },
            { emoji: '📞', title: 'Customer Support', sub: "We're Here to Help" },
            { emoji: '🚚', title: 'Worldwide Shipping', sub: 'Reliable Delivery' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-2">{item.emoji}</div>
              <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-slate-500 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
