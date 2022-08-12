import * as trpcNext from '@trpc/server/adapters/next';
import { serverRouter } from '../../../server/router/router';
import { createContext } from '../../../server/router/context';

export default trpcNext.createNextApiHandler({
	router: serverRouter,
	createContext,
});

// import * as trpc from '@trpc/server';
// import { z } from 'zod';
// import { prisma } from '../../../server/db/client';

// export const appRouter = trpc
// 	.router()
// 	.query('slugCheck', {
// 		input: z.object({
// 			slug: z.string(),
// 		}),
// 		async resolve({ input }) {
// 			console.log('Hitted slugCheck query resolve [trpc].ts');
// 			const count = await prisma.shortLink.count({
// 				where: {
// 					slug: input.slug,
// 				},
// 			});
// 			return { used: count > 0 };
// 		},
// 	})
// 	.mutation('createSlug', {
// 		input: z.object({
// 			slug: z.string(),
// 			url: z.string(),
// 		}),
// 		async resolve({ input }) {
// 			console.log('Hitted createSlug mutation resolve [trpc].ts');
// 			try {
// 				await prisma.shortLink.create({
// 					data: {
// 						slug: input.slug,
// 						url: input.url,
// 					},
// 				});
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		},
// 	});

// export type AppRouter = typeof appRouter;

// export default trpcNext.createNextApiHandler({
// 	router: appRouter,
// 	createContext: () => null,
// });
