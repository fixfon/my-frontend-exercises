import * as trpc from '@trpc/server';
import { hash } from 'argon2';
import { z } from 'zod';

import { Context } from './context';
import { signUpSchema } from '../../common/validation/auth';
// TODO: create a schema for slug links and exclude private routes from it

export const serverRouter = trpc
	.router<Context>()
	.mutation('signup', {
		input: signUpSchema,
		resolve: async ({ input, ctx }) => {
			const { username, password, email } = input;

			const checkExistince = await ctx.prisma.user.findFirst({
				where: {
					OR: [{ username }, { email }],
				},
			});

			if (checkExistince) {
				throw new trpc.TRPCError({
					code: 'CONFLICT',
					message: 'User with this email or username already exists',
				});
			}

			const hashedPassword = await hash(password);
			const user = await ctx.prisma.user.create({
				data: { username, email, password: hashedPassword },
			});

			return {
				status: 201,
				message: 'User created successfully',
				result: user.email,
			};
		},
	})
	.query('slugCheck', {
		input: z.object({
			slug: z.string(),
		}),
		async resolve({ input, ctx }) {
			console.log('Hitted slugCheck query resolve [trpc].ts');
			const count = await ctx.prisma.shortLink.count({
				where: {
					slug: input.slug,
				},
			});
			return { used: count > 0 };
		},
	})
	.mutation('createSlug', {
		input: z.object({
			slug: z.string(),
			url: z.string(),
		}),
		async resolve({ input, ctx }) {
			console.log('Hitted createSlug mutation resolve [trpc].ts');
			try {
				await ctx.prisma.shortLink.create({
					data: {
						slug: input.slug,
						url: input.url,
					},
				});
			} catch (error) {
				console.log(error);
			}
		},
	});

export type ServerRouter = typeof serverRouter;
