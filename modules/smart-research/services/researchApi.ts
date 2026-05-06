// Smart Research — API Service Layer
// All research/consensus API interactions go through here

export async function runSmartResearch(keyword: string) {
  const res = await fetch('/api/leads/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword }),
  });
  if (!res.ok) throw new Error('Research failed');
  return res.json();
}

export async function fetchTrends(keyword: string) {
  const res = await fetch(`/api/trends?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error('Trend fetch failed');
  return res.json();
}
