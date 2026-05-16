
const { consensusResearch } = require('./lib/ai/consensus');
const dotenv = require('dotenv');
dotenv.config();

async function test() {
  console.log("Testing consensusResearch...");
  try {
    const results = await consensusResearch("mosaic lamp Turkish", "PRO_AGENCY");
    console.log("Results received:", JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Error caught:", error);
  }
}

test();
