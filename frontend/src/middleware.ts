import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các route cần xác thực
const AUTHENTICATED_ROUTES = [
  '/dashboard',
  '/calendar',
  '/chat',
  '/profile',
  '/settings'
];

// Danh sách các route công khai
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password'
];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // Kiểm tra nếu đã đăng nhập và cố truy cập trang công khai
  if (accessToken && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Kiểm tra nếu chưa đăng nhập và cố truy cập các trang yêu cầu xác thực
  if (!accessToken && AUTHENTICATED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Cấu hình các routes cần áp dụng middleware
export const config = {
  matcher: "/:path*",
};