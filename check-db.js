const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const lastSearch = await prisma.searchHistory.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  console.log('Query:', lastSearch.query);
  const products = lastSearch.results.products;
  if (products && products.length > 0) {
    console.log('Keys in first product:', Object.keys(products[0]));
    console.log('doNotBuild:', products[0].doNotBuild);
    console.log('failureModes:', products[0].failureModes);
    console.log('saturationIndex:', products[0].saturationIndex);
  }
  await prisma.$disconnect();
}
check();
