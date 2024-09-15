import { TYPE_ERROR } from "./enum/User.enum";
import { authRouteList, authRoutes, privateRouteList } from "@/routes/route";
import { NextRequest, NextResponse } from "next/server";
import { KEY_LOGGEDIN } from "./constants";
import { authState } from "./stores/userSlice";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPrivateRoute = privateRouteList.includes(path);
  const isAuthRoute = authRouteList.includes(path);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);

  const getAuth: authState = JSON.parse(
    req.cookies.get(KEY_LOGGEDIN)?.value || "{}"
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
        `${authRoutes.LOGIN}?error=${true}&type=${TYPE_ERROR.NOT_LOGIN}`,
        req.nextUrl
      )
    );
  }

  // check is loggedin
  if (isAuthRoute) {
    if (getAuth?.isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/?error=${true}&type=${TYPE_ERROR.IS_LOGGED_IN}`, req.nextUrl)
      );
    }
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
