'use client';

import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d1b4e] to-[#1a1a1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8F00FF] to-[#0000FF] bg-clip-text text-transparent mb-2">
            AllMySell
          </h1>
          <p className="text-gray-400">Hesabınıza giriş yapın</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#252525] rounded-2xl shadow-2xl p-8 border border-[#8F00FF]/20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-[#8F00FF]/50" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full bg-[#1a1a1a] border border-[#8F00FF]/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-[#8F00FF] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-[#8F00FF]/50" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-[#8F00FF]/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-[#8F00FF] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8F00FF] to-[#0000FF] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 mt-6"
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#8F00FF]/20"></div>
            <span className="text-gray-400 text-sm">veya</span>
            <div className="flex-1 h-px bg-[#8F00FF]/20"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Hesabınız yok mu?{' '}
              <Link
                href="/register"
                className="text-[#8F00FF] hover:text-[#8F00FF]/80 font-semibold transition-colors"
              >
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Giriş yaparak{' '}
          <Link href="/terms" className="text-[#8F00FF] hover:underline">
            Koşulları
          </Link>{' '}
          kabul edersiniz
        </p>
      </div>
    </div>
  );
}
