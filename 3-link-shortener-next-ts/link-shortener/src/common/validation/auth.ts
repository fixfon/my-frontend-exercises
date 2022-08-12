import * as z from 'zod';

export const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(4).max(16),
});

export const signUpSchema = loginSchema.extend({
	email: z.string().email(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
