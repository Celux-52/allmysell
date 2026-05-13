const OpenAI = require('openai');
require('dotenv').config();

async function testOpenRouter() {
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  try {
    console.log("Testing OpenRouter with model: openrouter/free...");
    const response = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [{ role: "user", content: "Say hello" }],
    });
    console.log("Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("OpenRouter Error:", error.message);
  }
}

testOpenRouter();
