import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Regex expression to match only "/admin"
const adminRoute = RegExp("^/admin$");
/* 
  Had to use this regex expression because middleware runs on every
  route that starts with 'admimn'.
  
  So if the user tried to navigate to any  ".../admin" route, middleware would run
  and redirect the user to 'admin/dashboard' , where it would run again, and redirect
  once more, resulting in a loop. So it will redirect only if it is '/admin' with no
  named parameters.
  
*/

// Middleware to run before loading admin pages
export function middleware(request: NextRequest) {
  // If the user navigates to any url starting with ".../admin"
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname.match(adminRoute))
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}

// Run middleware on
export const config = {
  // Any route that starts with /admin.
  // : =>  Includes named parameters
  // * => Modifier on named parameters  ('*' is zero or more, '?' is zero or one and '+' one or more)
  matcher: ["/admin"],
};
