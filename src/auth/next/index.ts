import { getSessionCookie } from 'better-auth/cookies';
import { nextCookies, toNextJsHandler } from 'better-auth/next-js';
import { headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

type AuthInstance = Parameters<typeof toNextJsHandler>[0];
type SessionAuth = { api: { getSession: (ctx: { headers: Headers }) => Promise<unknown> } };

export { nextCookies, toNextJsHandler };

/** Returns `{ GET, POST }` for `app/api/auth/[...all]/route.ts`. */
export function createAuthRouteHandler(auth: AuthInstance) {
  return toNextJsHandler(auth);
}

/** Server-side session lookup for Server Components and Server Actions. */
export async function getServerSession<A extends SessionAuth>(auth: A) {
  return (await auth.api.getSession({ headers: await headers() })) as Awaited<ReturnType<A['api']['getSession']>>;
}

export interface AuthMiddlewareOptions {
  loginPath?: string;
  /** Path prefixes that skip the session check. */
  publicPaths?: string[];
}

/** Cookie-only gate for Next middleware/proxy; validate the session on the server for real checks. */
export function createAuthMiddleware({ loginPath = '/login', publicPaths = [] }: AuthMiddlewareOptions = {}) {
  const open = [loginPath, ...publicPaths];

  return function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (open.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
      return NextResponse.next();
    }
    if (!getSessionCookie(request)) {
      const url = new URL(loginPath, request.url);
      url.searchParams.set('callbackUrl', pathname + request.nextUrl.search);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  };
}
