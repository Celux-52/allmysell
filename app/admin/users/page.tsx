'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Mail, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: string;
  provider: string;
  emailConfirmed: boolean;
  lastSignIn: string | null;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !search || 
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.fullName || '').toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cornsilk mb-1">Users</h1>
          <p className="text-gray-400 text-sm">{users.length} registered users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 text-sm"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-[#1A1A1A] rounded-xl border border-white/5 p-8">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-1/3 h-3 bg-white/5 rounded animate-pulse"></div>
                  <div className="w-1/4 h-2 bg-white/5 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-[#1A1A1A] rounded-xl border border-white/5 p-12 text-center">
          <Users className="mx-auto text-gray-600 mb-3" size={40} />
          <p className="text-gray-400 mb-1">No users found</p>
          <p className="text-gray-600 text-sm">
            {search ? 'Try a different search term' : 'Users will appear here after they register'}
          </p>
        </div>
      ) : (
        <div className="bg-[#1A1A1A] rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#111111]">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Provider</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Status</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Sign In</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                        ) : (
                          <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {(user.fullName || user.email)[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-cornsilk">{user.fullName || 'No Name'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.provider === 'google' ? 'bg-blue-500/10 text-blue-400' :
                        user.provider === 'github' ? 'bg-gray-500/10 text-gray-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        {user.provider}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-amber-500/10 text-amber-400' : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        {user.role === 'admin' && <Shield size={10} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {user.emailConfirmed ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle size={12} /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                          <XCircle size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {user.lastSignIn ? (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(user.lastSignIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ) : 'Never'}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
