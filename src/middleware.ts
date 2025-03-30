import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Kiểm tra nếu đang truy cập trang thanh toán
  if (request.nextUrl.pathname === '/checkout') {
    // Lấy trạng thái giỏ hàng từ localStorage thông qua cookies
    const cartItems = request.cookies.get('cartItems')?.value;
    
    // Chỉ chuyển hướng khi không có cartItems cookie
    if (!cartItems) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Tạo response mới với pathname trong headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
}; 