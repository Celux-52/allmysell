'use client';

import { useState, useEffect } from 'react';
import { Users, LogOut } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  fullName: string;
  platform: string;
  monthlyOrders: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Kullanıcılar yüklenemedi');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#2d1b4e] to-[#000000]">
      {/* Header */}
      <div className="bg-[#252525] border-b border-[#808000]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#808000] to-[#CD853F] rounded-lg flex items-center justify-center">
                <Users className="text-cornsilk" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cornsilk">Admin Panel</h1>
                <p className="text-gray-400 text-sm">Kayıtlı Kullanıcılar</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-[#808000] transition-colors"
            >
              <LogOut size={20} />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#252525] border border-[#808000]/20 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Toplam Kullanıcı</p>
            <p className="text-3xl font-bold text-[#808000]">{users.length}</p>
          </div>
          <div className="bg-[#252525] border border-[#808000]/20 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Bu Ay Kayıt</p>
            <p className="text-3xl font-bold text-[#CD853F]">
              {users.filter((u) => {
                const date = new Date(u.createdAt);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
          <div className="bg-[#252525] border border-[#808000]/20 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Platform Dağılımı</p>
            <p className="text-sm text-gray-300 mt-2">
              {users.length > 0 ? (
                Object.entries(
                  users.reduce((acc: any, user) => {
                    acc[user.platform] = (acc[user.platform] || 0) + 1;
                    return acc;
                  }, {})
                )
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .slice(0, 3)
                  .map(([platform, count]) => `${platform} (${count})`)
                  .join(', ')
              ) : (
                'Veri yok'
              )}
            </p>
          </div>
          <div className="bg-[#252525] border border-[#808000]/20 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">En Popüler</p>
            <p className="text-sm text-gray-300 mt-2">
              {users.length > 0
                ? Object.entries(
                    users.reduce((acc: any, user) => {
                      acc[user.platform] = (acc[user.platform] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .slice(0, 1)
                    .map(([platform]) => platform)
                    .join('')
                : 'Veri yok'}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 bg-[#252525] rounded-lg border border-[#808000]/20">
            <p className="text-gray-400 mb-2">Henüz kayıtlı kullanıcı yok</p>
            <p className="text-gray-500 text-sm">Kullanıcılar kayıt olduğunda burada görünecektir</p>
          </div>
        ) : (
          <div className="bg-[#252525] rounded-lg border border-[#808000]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#000000] border-b border-[#808000]/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ad</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Platform</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Aylık Sipariş</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tarih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#808000]/10">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[#2d2d2d] transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">{user.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-[#808000]/20 text-[#808000] rounded-full text-xs font-medium">
                          {user.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{user.monthlyOrders}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
