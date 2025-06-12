import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // Nếu đã đăng nhập và cố truy cập trang login hoặc homepage
  if (accessToken && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Nếu chưa đăng nhập và cố truy cập các trang yêu cầu xác thực
  if (!accessToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Cấu hình các routes cần áp dụng middleware
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};