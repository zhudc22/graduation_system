import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 直接允许访问登录页面
    if (path === '/login') {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value; // 获取 token 字符串

    // 检查是否存在 Token 且路径不是登录页
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const decodedToken = jwt.decode(token) as unknown;
        const {groupCodes} = decodedToken as { groupCodes: number[] };

        if (!groupCodes) {
            throw new Error('Group codes not found in token');
        }

        // 根据 groupCodes 确定用户角色
        const isAdmin = groupCodes.includes(2);
        const isTeacher = groupCodes.includes(1);
        const isStudent = groupCodes.includes(0);

        // 管理员权限
        if (path.startsWith('/admin')) {
            if (!isAdmin) {
                return NextResponse.redirect(new URL('/403', request.url));
            }
        }

        // 老师权限
        if (path.startsWith('/teacher')) {
            if (!isTeacher && !isAdmin) {
                return NextResponse.redirect(new URL('/403', request.url));
            }
        }

        // 学生权限
        if (path.startsWith('/student')) {
            if (!isStudent && !isTeacher && !isAdmin) {
                return NextResponse.redirect(new URL('/403', request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        // 捕获错误，如果解析 Token 失败则重定向到登录页
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*'],
};
