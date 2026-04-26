'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqCategories = [
  {
    category: 'Orders & Shipping',
    questions: [
      { question: 'How long does shipping take?', answer: "We offer various shipping options. Standard shipping typically takes 5-10 business days, while express shipping takes 2-5 business days. Shipping times may vary depending on your location and the marketplace you're ordering from." },
      { question: 'Do you ship internationally?', answer: 'Yes! We ship worldwide through our various marketplace stores. International shipping times vary by destination, typically ranging from 7-21 business days.' },
      { question: 'How can I track my order?', answer: "Once your order ships, you'll receive a tracking number via email from the marketplace (eBay, Amazon, etc.). You can use this number to track your package's journey in real-time." },
      { question: 'What if my order is delayed?', answer: "If your order is delayed beyond the expected delivery date, please contact us immediately. We'll investigate with the shipping carrier and provide a solution." },
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      { question: 'What is your return policy?', answer: "We offer a 30-day return policy on most items. Products must be in original condition with all packaging. Returns are processed through the respective marketplace's return system (eBay, Amazon, etc.)." },
      { question: 'How do I initiate a return?', answer: 'To initiate a return, go to your order on the marketplace where you purchased (eBay, Amazon, etc.) and select "Return item". Follow the prompts to complete your return request.' },
      { question: 'When will I receive my refund?', answer: 'Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method.' },
      { question: 'Who pays for return shipping?', answer: "If the return is due to our error or a defective product, we'll cover the return shipping costs. For other returns, the buyer is responsible for return shipping fees." },
    ]
  },
  {
    category: 'Products & Quality',
    questions: [
      { question: 'Are your products authentic?', answer: 'Yes! All our products are 100% authentic. We source directly from authorized distributors and manufacturers. We never sell counterfeit items.' },
      { question: 'Do your products come with warranty?', answer: 'Most of our products come with manufacturer warranty. Warranty period varies by product - please check the individual product listing for specific warranty information.' },
      { question: 'What if I receive a defective product?', answer: "If you receive a defective product, contact us immediately. We'll arrange for a replacement or full refund, including return shipping costs." },
      { question: 'How do I know which product is right for me?', answer: "Each product listing includes detailed specifications and compatibility information. If you're unsure, feel free to contact us before purchasing - we're happy to help!" },
    ]
  },
  {
    category: 'Payment & Security',
    questions: [
      { question: 'What payment methods do you accept?', answer: 'We accept all major payment methods available on our marketplace platforms, including credit/debit cards, PayPal, and other digital payment options.' },
      { question: 'Is it safe to order from you?', answer: "Absolutely! All transactions are protected by the marketplace's buyer protection program (eBay Money Back Guarantee, Amazon A-to-Z Guarantee, etc.). Your payment information is securely encrypted." },
      { question: 'Do you store my payment information?', answer: "No, we don't store any payment information. All payments are processed securely through the marketplace platforms (eBay, Amazon, etc.)." },
    ]
  },
  {
    category: 'Account & Support',
    questions: [
      { question: 'How can I contact customer support?', answer: "You can reach us through the marketplace's messaging system, or contact us directly via our website. We respond to all inquiries within 24 hours." },
      { question: 'What are your customer support hours?', answer: 'We provide customer support 24/7. Our team is always available to assist you with any questions or concerns.' },
      { question: 'Can I cancel my order?', answer: 'Yes, you can cancel your order before it ships. Please contact us immediately through the marketplace messaging system to request cancellation.' },
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 px-6 text-left flex justify-between items-center hover:bg-white/[0.03] transition-colors rounded-lg">
        <span className="font-semibold text-white pr-4 text-sm">{question}</span>
        <ChevronDown className={`w-5 h-5 text-orange-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-5 text-slate-400 leading-relaxed text-sm">{answer}</div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20 mb-6">FAQ</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Find answers to common questions about shopping with AllMySell</p>
        </div>

        <div className="space-y-6">
          {faqCategories.map((category, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white">{category.category}</h2>
              </div>
              <div>{category.questions.map((item, qIndex) => (<FAQItem key={qIndex} question={item.question} answer={item.answer} />))}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-slate-400 mb-6">Can&apos;t find the answer you&apos;re looking for? Our customer support team is here to help.</p>
          <a href="/contact" className="btn-primary inline-block"><span>Contact Us</span></a>
        </div>
      </div>
    </div>
  );
}
