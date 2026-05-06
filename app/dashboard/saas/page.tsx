import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, CreditCard, DollarSign, Users, Zap, TrendingUp, Download, Plus } from 'lucide-react';

export default function SaaSPanelPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        SaaS Yönetim Paneli
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Sistem kaynaklarını, gelirleri ve kullanıcı istatistiklerini buradan yönetin
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-400">
                        <Download className="mr-2 h-4 w-4" />
                        Rapor İndir
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-0 shadow-lg shadow-orange-500/25">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Plan Ekle
                    </Button>
                </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-orange-500/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Aylık Toplam Gelir</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₺45,231.89</div>
                        <p className="text-xs text-green-500 mt-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> +20.1% geçen aydan
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-orange-500/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Aktif Abonelikler</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+2,350</div>
                        <p className="text-xs text-slate-400 mt-1">
                            +180 yeni üye bu ay
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-orange-500/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Sistem İşlemleri</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-orange-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+12,234</div>
                        <p className="text-xs text-orange-400 mt-1 flex items-center">
                            <Zap className="h-3 w-3 mr-1" /> API kullanımları arttı
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-orange-500/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Başarılı Ödemeler</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-indigo-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">%98.2</div>
                        <p className="text-xs text-slate-400 mt-1">
                            Ödeme başarı oranınız mükemmel
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Alt Detay Alanı */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-[#080c16] border-white/5 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-white">Gelir Analizi</CardTitle>
                        <CardDescription>Bu ayki abonelik ve ek gelir kaynakları dökümü</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5">
                        <div className="text-center text-muted-foreground flex flex-col items-center gap-3">
                            <BarChart3 className="h-10 w-10 text-orange-500/50" />
                            <p>Grafik Modülü Yükleniyor...</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-[#080c16] border-white/5 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-white">Son İşlemler</CardTitle>
                        <CardDescription>Platform üzerindeki son aktiviteler</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-9 w-9 rounded-full bg-orange-500/10 flex items-center justify-center">
                                        <Users className="h-4 w-4 text-orange-400" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">
                                            Yeni Premium Üye #{1042 + i}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            user{i}@example.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-green-400 text-sm">
                                        +₺499.00
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
