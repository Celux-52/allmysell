'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

const faqCategories = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'We offer various shipping options. Standard shipping typically takes 5-10 business days, while express shipping takes 2-5 business days. Shipping times may vary depending on your location and the marketplace you\'re ordering from.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship worldwide through our various marketplace stores. International shipping times vary by destination, typically ranging from 7-21 business days.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email from the marketplace (eBay, Amazon, etc.). You can use this number to track your package\'s journey in real-time.'
      },
      {
        question: 'What if my order is delayed?',
        answer: 'If your order is delayed beyond the expected delivery date, please contact us immediately. We\'ll investigate with the shipping carrier and provide a solution.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on most items. Products must be in original condition with all packaging. Returns are processed through the respective marketplace\'s return system (eBay, Amazon, etc.).'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'To initiate a return, go to your order on the marketplace where you purchased (eBay, Amazon, etc.) and select "Return item". Follow the prompts to complete your return request.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method.'
      },
      {
        question: 'Who pays for return shipping?',
        answer: 'If the return is due to our error or a defective product, we\'ll cover the return shipping costs. For other returns, the buyer is responsible for return shipping fees.'
      }
    ]
  },
  {
    category: 'Products & Quality',
    questions: [
      {
        question: 'Are your products authentic?',
        answer: 'Yes! All our products are 100% authentic. We source directly from authorized distributors and manufacturers. We never sell counterfeit items.'
      },
      {
        question: 'Do your products come with warranty?',
        answer: 'Most of our products come with manufacturer warranty. Warranty period varies by product - please check the individual product listing for specific warranty information.'
      },
      {
        question: 'What if I receive a defective product?',
        answer: 'If you receive a defective product, contact us immediately. We\'ll arrange for a replacement or full refund, including return shipping costs.'
      },
      {
        question: 'How do I know which product is right for me?',
        answer: 'Each product listing includes detailed specifications and compatibility information. If you\'re unsure, feel free to contact us before purchasing - we\'re happy to help!'
      }
    ]
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods available on our marketplace platforms, including credit/debit cards, PayPal, and other digital payment options.'
      },
      {
        question: 'Is it safe to order from you?',
        answer: 'Absolutely! All transactions are protected by the marketplace\'s buyer protection program (eBay Money Back Guarantee, Amazon A-to-Z Guarantee, etc.). Your payment information is securely encrypted.'
      },
      {
        question: 'Do you store my payment information?',
        answer: 'No, we don\'t store any payment information. All payments are processed securely through the marketplace platforms (eBay, Amazon, etc.).'
      }
    ]
  },
  {
    category: 'Account & Support',
    questions: [
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us through the marketplace\'s messaging system, or contact us directly via our website. We respond to all inquiries within 24 hours.'
      },
      {
        question: 'What are your customer support hours?',
        answer: 'We provide customer support 24/7. Our team is always available to assist you with any questions or concerns.'
      },
      {
        question: 'Can I cancel my order?',
        answer: 'Yes, you can cancel your order before it ships. Please contact us immediately through the marketplace messaging system to request cancellation.'
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 text-left flex justify-between items-center hover:bg-purple-50 transition-colors rounded-lg"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about shopping with AllMySell
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{category.category}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, qIndex) => (
                  <FAQItem key={qIndex} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
