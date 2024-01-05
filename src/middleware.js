import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export function middleware(request) {

    const cookieStore = cookies();

    if (!cookieStore.has('token') && (!request.nextUrl.pathname.startsWith('/register'))) {
        return NextResponse.rewrite(new URL('/login',request.url));
    }

    if ((request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) && cookieStore.has('token')) {
        return NextResponse.rewrite(new URL('/',request.url));
    }

}

export const config = {
    matcher : [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};