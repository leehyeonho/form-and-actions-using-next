import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/session";

interface Routes {
  [key: string]: boolean;
}

const authUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true
}

const securityUrls: Routes = {
  "/profile": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isSecurityPage = securityUrls[request.nextUrl.pathname];
  const isAuthPage = authUrls[request.nextUrl.pathname];

  if (isSecurityPage && !session.id) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthPage && session.id) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};