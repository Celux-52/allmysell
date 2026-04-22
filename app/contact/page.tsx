import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - AllMySell',
  description: 'Get in touch with AllMySell. Contact us for questions, support, or partnership opportunities.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-stone-900 !text-white hover:bg-stone-800 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-stone-500 text-lg">
            We're here to help! Reach out to us for any questions or support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-stone-50 rounded-2xl shadow-xl p-8 border border-stone-200/60">
            <h2 className="text-2xl font-bold mb-6 text-stone-900">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all bg-[#FAFAF9] text-stone-900 placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all bg-[#FAFAF9] text-stone-900 placeholder-gray-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-600 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all bg-[#FAFAF9] text-stone-900 placeholder-gray-600"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-600 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-[#E8750A]/20 rounded-lg focus:ring-2 focus:ring-[#E8750A] focus:border-transparent transition-all resize-none bg-[#FAFAF9] text-stone-900 placeholder-gray-600"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-stone-200/50 transition-all transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-stone-50 rounded-2xl shadow-xl p-8 border border-stone-200/60">
              <h2 className="text-2xl font-bold mb-6 text-stone-900">Our Team</h2>
              
              {/* Melih */}
              <div className="mb-6 pb-6 border-b border-stone-200/60">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-stone-900 !text-white hover:bg-stone-800 rounded-full flex items-center justify-center text-stone-900 text-2xl font-bold">
                    M
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-stone-900">Melih</h3>
                    <p className="text-stone-500">Co-Founder & Partner</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a 
                    href="tel:+905537065912" 
                    className="flex items-center text-stone-600 hover:text-stone-800 transition-colors group"
                  >
                    <Phone className="w-5 h-5 mr-3 text-stone-800 group-hover:scale-110 transition-transform" />
                    <span>+90 553 706 59 12</span>
                  </a>
                  <a 
                    href="https://wa.me/905537065912" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-stone-600 hover:text-green-500 transition-colors group"
                  >
                    <svg className="w-5 h-5 mr-3 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="mailto:melihbicak@gmail.com" 
                    className="flex items-center text-stone-600 hover:text-stone-800 transition-colors group"
                  >
                    <Mail className="w-5 h-5 mr-3 text-stone-800 group-hover:scale-110 transition-transform" />
                    <span>melihbicak@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Yunus */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#C2410C] rounded-full flex items-center justify-center text-stone-900 text-2xl font-bold">
                    Y
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-stone-900">Şükür Yunus</h3>
                    <p className="text-stone-500">Co-Founder & Partner</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a 
                    href="tel:+905518343030" 
                    className="flex items-center text-stone-600 hover:text-stone-500 transition-colors group"
                  >
                    <Phone className="w-5 h-5 mr-3 text-stone-500 group-hover:scale-110 transition-transform" />
                    <span>+90 551 834 30 30</span>
                  </a>
                  <a 
                    href="https://wa.me/905518343030" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-stone-600 hover:text-green-500 transition-colors group"
                  >
                    <svg className="w-5 h-5 mr-3 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="mailto:yunussukur7@gmail.com" 
                    className="flex items-center text-stone-600 hover:text-stone-500 transition-colors group"
                  >
                    <Mail className="w-5 h-5 mr-3 text-stone-500 group-hover:scale-110 transition-transform" />
                    <span>yunussukur7@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-stone-50 rounded-2xl shadow-xl p-8 border border-stone-200/60">
              <h2 className="text-2xl font-bold mb-6 text-stone-900">Quick Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-stone-800 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Global E-Commerce Platform</h3>
                    <p className="text-stone-500">Serving customers worldwide through multiple marketplaces</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-stone-800 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Response Time</h3>
                    <p className="text-stone-500">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
