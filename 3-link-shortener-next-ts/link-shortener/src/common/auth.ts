import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';

import { prisma } from '../server/db/client';
import { loginSchema } from './validation/auth';

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'username',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials, request) => {
				const creds = await loginSchema.parseAsync(credentials);

				const user = await prisma.user.findFirst({
					where: { username: creds.username },
				});

				if (!user) {
					return null;
				}

				const isValidPassworod = await verify(user.password, creds.password);

				if (!isValidPassworod) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					username: user.username,
				};
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}

			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.id = token.id;
			}

			return session;
		},
	},
	jwt: {
		secret: 'super-secret',
		maxAge: 15 * 24 * 30 * 60, // 15 days
	},
	pages: {
		signIn: '/login',
		newUser: '/register',
	},
};
