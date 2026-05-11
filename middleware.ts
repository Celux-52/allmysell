import { NextResponse, NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdmin } from "@/lib/isAdmin";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return res;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            req.cookies.set(name, value)
          );
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: This call refreshes the session and may trigger setAll()
  const { data: { user } } = await supabase.auth.getUser();

  // Check for admin status early
  const isUserAdmin = user ? isAdmin(user.email) : false;

  const pathname = req.nextUrl.pathname;

  // Helper: create a redirect that preserves refreshed session cookies
  function redirectWithCookies(destination: string) {
    const url = new URL(destination, req.url);
    const redirectRes = NextResponse.redirect(url);
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value);
    });
    return redirectRes;
  }

  // 1. Authenticated users should NOT see login/register pages
  const authPaths = ['/login', '/register'];
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  if (isAuthPath && user) {
    return redirectWithCookies("/dashboard");
  }

  // 2. Protected routes: redirect to login if not authenticated
  const protectedPaths = ['/dashboard', '/admin'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath && !user) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    const redirectRes = NextResponse.redirect(url);
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value);
    });
    return redirectRes;
  }

  // 3. Admin-only routes
  if (pathname.startsWith("/admin") && user) {
    if (!isUserAdmin) {
      return redirectWithCookies("/dashboard");
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
