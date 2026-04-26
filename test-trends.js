const googleTrends = require('google-trends-api'); 
googleTrends.interestOverTime({keyword: 'orthopedic pet bed'}) 
.then(function(results){ console.log(results.substring(0,200)); }) 
.catch(function(err){ console.error('Error:', err); });
