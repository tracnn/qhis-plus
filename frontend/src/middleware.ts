import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Chỉ bảo vệ các route bắt đầu bằng /protected
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Lấy accessToken từ cookie
    const accessToken = request.cookies.get('accessToken')?.value;
    if (!accessToken) {
      // Chưa đăng nhập, chuyển hướng về trang đăng nhập
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  // Cho phép truy cập bình thường
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}; 