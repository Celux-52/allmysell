import { Shield, Lock, CheckCircle, Award } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-3 mb-3">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Secure Payment</h3>
            <p className="text-xs text-gray-600 mt-1">SSL Encrypted</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-3 mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Buyer Protection</h3>
            <p className="text-xs text-gray-600 mt-1">100% Protected</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 rounded-full p-3 mb-3">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Verified Seller</h3>
            <p className="text-xs text-gray-600 mt-1">Trusted Store</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-100 rounded-full p-3 mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Quality Guarantee</h3>
            <p className="text-xs text-gray-600 mt-1">30 Days Return</p>
          </div>
        </div>
      </div>
    </div>
  );
}
