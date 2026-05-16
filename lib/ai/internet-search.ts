/**
 * Shared utility for fetching live internet data via n8n search tool.
 * Separated to avoid circular dependencies between consensus and other modules.
 */

export async function fetchInternetDataViaTool(query: string): Promise<string> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://n8n.allmysell.com/webhook/search";
  console.log(`[InternetTool] Initiating search for: "${query}"`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // Strict 1s timeout to prevent Vercel 504s

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error(`[InternetTool] n8n search failed (${n8nResponse.status}):`, errorText);
      return "";
    }

    const data = await n8nResponse.json();

    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      console.log(`[InternetTool] Success: Found ${data.results.length} results`);
      const parsedResults = data.results
        .map((r: any) => `Title: ${r.title}\nLink: ${r.link}\nSnippet: ${r.snippet}`)
        .join('\n\n');

      return `\n\n--- LIVE INTERNET DATA (n8n Search) ---\n${parsedResults}\n---------------------------\n\n`;
    }

    console.warn(`[InternetTool] n8n returned no results. Data:`, JSON.stringify(data));
    return "";
  } catch (e) {
    console.error("[InternetTool] n8n fetch error:", e);
    return "";
  }
}
