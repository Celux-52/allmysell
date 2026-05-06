// Etsy Automation — API Service Layer
// All Etsy API interactions go through here

export async function analyzeProduct(keyword: string) {
  const res = await fetch('/api/etsy/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword }),
  });
  if (!res.ok) throw new Error('Analysis failed');
  return res.json();
}

export async function generateListing(productId: string, title: string, tags: string[]) {
  const res = await fetch('/api/etsy/generate-listing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, title, tags }),
  });
  if (!res.ok) throw new Error('Listing generation failed');
  return res.json();
}

export async function findSupplier(productId: string, title: string, tags: string[], price: number) {
  const res = await fetch('/api/etsy/find-supplier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, title, tags, price }),
  });
  if (!res.ok) throw new Error('Supplier search failed');
  return res.json();
}
