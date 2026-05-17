export const isAdmin = (email?: string | null) => {
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
  
  const hardcodedAdmins = [
    'melih20052005gs@gmail.com',
    'melih@allmysell.com',
    'melihbicak@gmail.com',
    'yunus@allmysell.com',
    'yunussukur7@gmail.com'
  ];

  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  return admins.includes(lowerEmail) || hardcodedAdmins.includes(lowerEmail);
};
