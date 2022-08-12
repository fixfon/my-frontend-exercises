import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

function MyApp({ Component, pageProps }: AppProps) {
	console.log('Hitted MyApp _app.tsx');
	return <Component {...pageProps} />;
}

function getBaseUrl() {
	console.log('Hitted getBaseUrl _app.tsx');
	if (process.browser) return '';
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

	return `https://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
	config() {
		console.log('Hitted withTRPC config _app.tsx');
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			url,
		};
	},
	ssr: false,
})(MyApp);
