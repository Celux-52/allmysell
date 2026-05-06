async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/etsy/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: "wallet" })
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
test();
