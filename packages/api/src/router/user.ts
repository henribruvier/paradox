import {t} from '../trpc';
import {z} from 'zod';

export const userRouter = t.router({
	all: t.procedure.query(({ctx}) => {
		return ctx.prisma.user.findMany();
	}),
	byId: t.procedure.input(z.number()).query(({ctx, input}) => {
		return ctx.prisma.user.findFirst({where: {id: input}});
	}),
	create: t.procedure
		.input(
			z.object({
				name: z.string(),
				email: z.string(),
				password: z.string(),
			}),
		)
		.mutation(({ctx, input}) => {
			return ctx.prisma.user.create({data: input});
		}),
});
