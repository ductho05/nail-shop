import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const privateRouteList = [
  "/cart-detail",
  "/payment",
  "/account/profile",
  "/account/my-order",
  "/account/my-address",
];
const authRouteList = ["/auth/login", "/auth/register", "/auth/otp"];

const adminRouteList = ["/admin", "/admin/product", "/admin/order"]

const isAdmin = (token: string) => {
  const decodedToken:any = jwtDecode(token);
  return decodedToken?.roles === 'admin'
  
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPrivateRoute = privateRouteList.includes(path);
  const isAuthRoute = authRouteList.includes(path);
  const isAdminRoute = adminRouteList.includes(path)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);
  
  const getAuth: any = JSON.parse(
    req.cookies.get("auth")?.value || "{}"
  );

  // Check private request
  if (isPrivateRoute) {
    if (getAuth?.isLoggedIn) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${true}&type=NotLoggedIn`,
        req.nextUrl
      )
    );
  }

  // check is admin request
  if (isAdminRoute) {
    if (getAuth?.isLoggedIn && isAdmin(getAuth?.accessToken)) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${true}&type=NotLoggedIn`,
        req.nextUrl
      )
    );
  }

  // check is loggedin
  if (isAuthRoute) {
    if (getAuth?.isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/?error=${true}&type=IsLoggedIn`, req.nextUrl)
      );
    }
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  unstable_allowDynamic: [
    // allows a single file
    '/lib/utilities.js',
    // use a glob to allow anything in the function-bind 3rd party module
    '/node_modules/function-bind/**',
  ],
}
