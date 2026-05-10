export const isAdmin = (email?: string | null) => {
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
  return email ? admins.includes(email.toLowerCase()) : false;
};
