"use client";

import { usePathname } from "next/navigation";

/**
 * Hides children on routes that start with specified prefixes.
 * Used to prevent public Navigation/Footer from rendering on dashboard pages
 * which have their own DashboardShell layout.
 */
export default function HideOnRoutes({
  children,
  hiddenPrefixes = ["/dashboard", "/admin"],
}: {
  children: React.ReactNode;
  hiddenPrefixes?: string[];
}) {
  const pathname = usePathname();
  const shouldHide = hiddenPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (shouldHide) return null;
  return <>{children}</>;
}
