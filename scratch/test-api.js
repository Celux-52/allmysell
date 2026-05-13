const keyword = "silver necklace";
fetch('http://localhost:3000/api/etsy/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ keyword })
})
.then(res => res.json().then(data => console.log(res.status, data)))
.catch(console.error);
