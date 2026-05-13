"use client";

import { Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const whatsappPath = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20 mb-6">{t('contact.badge')}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            {t('contact.title1')} <span className="gradient-text">{t('contact.title2')}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">{t('contact.sendMsg')}</h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.name')}</label>
                <input type="text" id="name" className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-slate-500" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.email')}</label>
                <input type="email" id="email" className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-slate-500" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.subject')}</label>
                <input type="text" id="subject" className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-slate-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.message')}</label>
                <textarea id="message" rows={6} className="w-full px-4 py-3 glass-input rounded-xl resize-none text-white placeholder-slate-500" />
              </div>
              <button type="submit" className="w-full btn-primary py-3.5 text-base"><span>{t('contact.sendBtn')}</span></button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">{t('contact.team')}</h2>
              <div className="mb-6 pb-6 border-b border-white/[0.06]">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">M</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Melih</h3>
                    <p className="text-slate-500 text-sm">{t('contact.cofounder')}</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <a href="tel:+905537065912" className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group text-sm"><Phone className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" /><span>+90 553 706 59 12</span></a>
                  <a href="https://wa.me/905537065912" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-green-400 transition-colors group text-sm"><svg className="w-4 h-4 mr-3 text-green-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d={whatsappPath}/></svg><span>WhatsApp</span></a>
                  <a href="mailto:melihbicak@gmail.com" className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group text-sm"><Mail className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" /><span>melihbicak@gmail.com</span></a>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">Y</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Şükür Yunus</h3>
                    <p className="text-slate-500 text-sm">{t('contact.cofounder')}</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <a href="tel:+905518343030" className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group text-sm"><Phone className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" /><span>+90 551 834 30 30</span></a>
                  <a href="https://wa.me/905518343030" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-green-400 transition-colors group text-sm"><svg className="w-4 h-4 mr-3 text-green-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d={whatsappPath}/></svg><span>WhatsApp</span></a>
                  <a href="mailto:yunussukur7@gmail.com" className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group text-sm"><Mail className="w-4 h-4 mr-3 text-orange-400 group-hover:scale-110 transition-transform" /><span>yunussukur7@gmail.com</span></a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">{t('contact.quickInfo')}</h2>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg"><MapPin className="w-5 h-5 text-white" /></div>
                  <div><h3 className="font-semibold text-white mb-1 text-sm">{t('contact.globalPlatform')}</h3><p className="text-slate-500 text-sm">{t('contact.globalPlatformDesc')}</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                  <div><h3 className="font-semibold text-white mb-1 text-sm">{t('contact.responseTime')}</h3><p className="text-slate-500 text-sm">{t('contact.responseTimeDesc')}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
