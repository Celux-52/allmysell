import { consensusResearch } from './lib/ai/consensus.ts';
import fs from 'fs';

async function test() {
  console.log("Starting AI Consensus...");
  console.log("OpenRouter Key:", process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 8) + "..." : "MISSING");
  console.log("Gemini Key:", process.env.GEMINI_API_KEY ? "PRESENT" : "MISSING");
  try {
    const testQuery = "Self-cleaning water bottle with built-in UV-C sterilization for hikers";
    console.log(`Running analysis for: "${testQuery}"`);
    const result = await consensusResearch(testQuery);
    fs.writeFileSync('ai-output-test.json', JSON.stringify(result, null, 2));
    console.log("Done! Wrote to ai-output-test.json");
    if (result && result.products && result.products.length > 0) {
      const p = result.products[0];
      console.log('--- TEST RESULTS ---');
      console.log('Product Name:', p.name);
      console.log('Score:', p.score);
      console.log('Has FailureModes:', p.failureModes && p.failureModes.length > 0 ? '✅ YES' : '❌ NO');
      console.log('Has SaturationIndex:', p.saturationIndex !== undefined ? '✅ YES (' + p.saturationIndex + ')' : '❌ NO');
      console.log('Google Data:', p.googleTrendsInsight || '❌ NO DATA');
      console.log('DoNotBuild Status:', p.doNotBuild ? '⛔ AVOID' : '✅ BUILD');
      console.log('Real Profit:', p.realProfitMargin);
      console.log('Providers Used:', result.aiProviders.join(', '));
    }
  } catch(e) {
    console.log("Error:", e);
  }
  process.exit(0);
}
test();
