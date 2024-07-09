import {NextRequest, NextResponse} from 'next/server';

export const config = {
    matcher: "/",
};

export function middleware(request: NextRequest) {

    const token = request.cookies.get('token'); // 从cookie中获取token
    // 检查token是否存在
    if (!token && request.nextUrl.pathname !== '/login') {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/login';
        return NextResponse.redirect(loginUrl);
    }

    // 如果有token或者已经在登录页面，正常继续处理
    return NextResponse.next();
}
