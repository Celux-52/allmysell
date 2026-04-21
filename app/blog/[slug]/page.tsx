import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog Post - AllMySell | Under Construction',
  description: 'This blog post is currently unavailable. AllMySell Blog is under construction.',
};

export default function BlogPostPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-800 text-cornsilk py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">&#128221;</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog Post Unavailable
          </h1>
          <div className="inline-block bg-cornsilk/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <p className="text-xl font-semibold">&#128679; Under Construction</p>
          </div>
          <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto">
            This blog post is currently unavailable while we redesign our blog.
            Please check back soon!
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-cornsilk px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <span>&#8592; Go to Homepage</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
