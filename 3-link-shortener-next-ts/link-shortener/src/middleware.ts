import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	console.log('Hitted middleware middleware.ts');
	if (
		req.nextUrl.pathname.startsWith('/login') ||
		req.nextUrl.pathname.startsWith('/register')
	) {
		return NextResponse.next(req);
	}
	const slug = req.nextUrl.pathname.split('/').pop();

	const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

	if (slugFetch.status === 404) {
		return NextResponse.redirect(`${req.nextUrl.origin}`);
	}

	const data = await slugFetch.json();

	if (data?.url) {
		return NextResponse.redirect(data.url);
	}
}

export const config = {
	matcher: '/:slug',
};
