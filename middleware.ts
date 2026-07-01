import { NextResponse, type NextRequest } from "next/server";

// MAINTENANCE MODE
// The full site lives on the `pagina-completa` branch. While this is on `main`,
// every route is rewritten to the OUT OF SERVICE / maintenance page.
// To bring the site back, restore `middleware.ts` from `pagina-completa`.
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Let the maintenance page itself render to avoid a rewrite loop.
	if (pathname === "/maintenance") {
		return NextResponse.next();
	}

	const url = request.nextUrl.clone();
	url.pathname = "/maintenance";

	return NextResponse.rewrite(url, {
		status: 503,
		headers: { "Retry-After": "3600" },
	});
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except static assets so the maintenance page
		 * can still load its CSS, fonts and images:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico
		 * - common image extensions
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
