const apiKey = "foj8uz5ule44yrmogcvgtq0a";

fetch("https://openapi.etsy.com/v3/application/openapi-ping", {
  headers: {
    "x-api-key": apiKey
  }
})
.then(res => res.json().then(data => ({ status: res.status, data })))
.then(console.log)
.catch(console.error);

fetch(`https://openapi.etsy.com/v3/application/listings/active?limit=1&keywords=wallet`, {
  headers: {
    "x-api-key": apiKey
  }
})
.then(res => res.json().then(data => ({ status: res.status, data })))
.then(console.log)
.catch(console.error);
