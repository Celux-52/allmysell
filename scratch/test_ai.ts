
import { consensusResearch } from '../lib/ai/consensus';
import { EtsyAIEngine } from '../lib/ai/etsy-ai-engine';

async function testEngines() {
  console.log('🚀 [TEST] Yapay Zeka Motorları Başlatılıyor...');

  // 1. Akıllı Araştırma Testi (Nemotron 3 Super)
  console.log('\n--- 🔍 AKILLI ARAŞTIRMA TESTİ (NVIDIA Nemotron) ---');
  try {
    const researchResult = await consensusResearch('eco-friendly modular furniture for small apartments');
    console.log('✅ Akıllı Araştırma Yanıtı Alındı!');
    console.log('Özet:', researchResult.summary);
    console.log('İlk Ürün Skoru:', researchResult.products[0]?.score);
  } catch (err) {
    console.error('❌ Akıllı Araştırma Hatası:', err);
  }

  // 2. Etsy Sniper Testi (Xiaomi MiMo-V2-Flash)
  console.log('\n--- 🎯 ETSY SNIPER TESTİ (Xiaomi MiMo-V2-Flash) ---');
  try {
    const etsyResult = await EtsyAIEngine.analyzeProduct('personalized wooden puzzle for toddlers');
    console.log('✅ Etsy Sniper Yanıtı Alındı!');
    console.log('Karar:', etsyResult.analysis.decision);
    console.log('Trend Skoru:', etsyResult.analysis.trendScore);
    console.log('Strateji:', etsyResult.analysis.sniperStrategy);
  } catch (err) {
    console.error('❌ Etsy Sniper Hatası:', err);
  }
}

testEngines();
