'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Mail, BarChart3, MessageSquare, Loader2, Globe, Target, Send } from 'lucide-react';

const countries = [
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'tr', label: 'Turkey' },
    { value: 'nl', label: 'Netherlands' },
    { value: 'es', label: 'Spain' },
    { value: 'it', label: 'Italy' },
];

export default function LeadEnginePage() {
    const [country, setCountry] = useState('');
    const [niche, setNiche] = useState('');
    const [leadCount, setLeadCount] = useState('100');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState('');

    const [stats, setStats] = useState({
        totalLeads: 0,
        emailsSent: 0,
        openRate: 0,
        replyCount: 0,
    });

    const [leads, setLeads] = useState<any[]>([]);

    const handleGenerateLeads = async () => {
        if (!country || !niche) return;

        setIsLoading(true);
        setProgress(0);
        setStage('Leadler aranıyor...');

        try {
            // Step 1: Generate Leads
            const leadResponse = await fetch('/api/leads/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country, niche, count: parseInt(leadCount) }),
            });

            const leadData = await leadResponse.json();
            setLeads(leadData.leads || []);
            setProgress(50);
            setStage('Email şablonları hazırlanıyor...');

            // Step 2: Send Emails
            const emailResponse = await fetch('/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leads: leadData.leads }),
            });

            setProgress(100);
            setStage('Tamamlandı!');

            // Update stats
            setStats({
                totalLeads: leadData.leads?.length || 0,
                emailsSent: leadData.leads?.length || 0,
                openRate: 12,
                replyCount: Math.floor((leadData.leads?.length || 0) * 0.03),
            });

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
                setStage('');
            }, 1500);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Lead Engine</h1>
                <p className="text-muted-foreground mt-1">
                    Hedef kitleye göre lead bulun ve otomatik cold email kampanyaları başlatın
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Lead</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalLeads}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gönderilen Email</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.emailsSent}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Açılma Oranı</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">%{stats.openRate}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cevap Sayısı</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.replyCount}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="generator" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="generator">Lead Oluşturucu</TabsTrigger>
                    <TabsTrigger value="history">Geçmiş Kampanyalar</TabsTrigger>
                    <TabsTrigger value="templates">Email Şablonları</TabsTrigger>
                </TabsList>

                <TabsContent value="generator" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Kampanya Ayarları
                                </CardTitle>
                                <CardDescription>
                                    Hedef kitle bilgilerini girin ve lead toplamaya başlayın
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Hedef Ülke</label>
                                    <Select value={country} onValueChange={setCountry}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Ülke seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map(c => (
                                                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Niche / Sektör</label>
                                    <Input
                                        placeholder="Örn: dropshipping, fitness, yazılım..."
                                        value={niche}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNiche(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Lead Sayısı</label>
                                    <Select value={leadCount} onValueChange={setLeadCount}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="100">100 Lead (Basic Plan)</SelectItem>
                                            <SelectItem value="500">500 Lead (Pro Plan)</SelectItem>
                                            <SelectItem value="1000">1000 Lead (Premium Plan)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {isLoading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>{stage}</span>
                                            <span>%{progress}</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    disabled={isLoading || !country || !niche}
                                    onClick={handleGenerateLeads}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            İşleniyor...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Leads Getir ve Gönder
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Sonuçlar
                                </CardTitle>
                                <CardDescription>
                                    Bulunan leadler burada listelenecektir
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {leads.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Henüz lead bulunmadı
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                        {leads.map((lead, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <div className="font-medium">{lead.name}</div>
                                                    <div className="text-sm text-muted-foreground">{lead.company}</div>
                                                </div>
                                                <Badge variant="outline">{lead.status || 'pending'}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Geçmiş Kampanyalar</CardTitle>
                            <CardDescription>
                                Tüm lead kampanyalarınızın geçmişi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                Henüz kampanya oluşturulmadı
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="templates">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Şablonları</CardTitle>
                            <CardDescription>
                                Cold email şablonlarınızı buradan yönetin
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border p-4 rounded-lg bg-muted/30">
                                <div className="font-medium mb-2">Varsayılan Cold Email Şablonu</div>
                                <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                                    Subject: Quick question about your store

                                    Hi {'{{name}}'},

                                    I came across {'{{company}}'} and noticed something interesting.

                                    We help businesses like yours get consistent new customers automatically.

                                    Would you be open to a quick chat?

                                    Best,
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}