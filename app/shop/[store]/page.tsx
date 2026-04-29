import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return ['ebay', 'amazon', 'etsy', 'shopify', 'tiktokshop'].map((store) => ({ store }));
}

export default async function StorePage() {
  redirect('/web-solutions');
}
