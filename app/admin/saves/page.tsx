import { prisma } from '@/lib/prisma';
import { Star, TrendingUp, Search, Calendar, User, ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function UserSavesPage() {
  const saves = await prisma.savedProduct.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2 flex items-center gap-3">
          <Star className="text-purple-600 h-8 w-8" /> User Saves
        </h1>
        <p className="text-stone-500">View what products your users are researching and saving to their accounts in real-time.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-stone-400" />
            All Saved Items
          </h2>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
            {saves.length} Total Saves
          </span>
        </div>
        
        {saves.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Star className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <p>No user has saved any products yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-500 uppercase text-xs tracking-wider border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Product Name</th>
                  <th className="px-6 py-4 font-medium">Category / Platform</th>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">AI Score</th>
                  <th className="px-6 py-4 font-medium">Margin</th>
                  <th className="px-6 py-4 font-medium text-right">Saved At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {saves.map((save) => (
                  <tr key={save.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900">{save.productName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-md text-xs font-medium">
                        {save.category || save.platform || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-[10px]">
                          U
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-800">User</p>
                          <p className="text-[10px] text-stone-500 truncate max-w-[100px]">{save.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        (save.aiScore || 0) >= 80 ? 'bg-green-100 text-green-700' :
                        (save.aiScore || 0) >= 60 ? 'bg-amber-100 text-amber-700' :
                        'bg-stone-100 text-stone-600'
                      }`}>
                        {save.aiScore || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      {save.profitMargin}%
                    </td>
                    <td className="px-6 py-4 text-right text-stone-400 text-xs whitespace-nowrap">
                      {new Date(save.createdAt).toLocaleDateString()} {new Date(save.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
