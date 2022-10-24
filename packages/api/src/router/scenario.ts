import {t} from '../trpc';
import {z} from 'zod';

export const scenarioRouter = t.router({
	all: t.procedure.query(({ctx}) => {
		return ctx.prisma.scenario.findMany();
	}),
	byId: t.procedure.input(z.string()).query(({ctx, input}) => {
		return ctx.prisma.scenario.findFirst({where: {id: input}});
	}),
	create: t.procedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				duration: z.number(),
				minimumPlayers: z.number(),
				maximumPlayers: z.number(),
				difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
			}),
		)
		.mutation(({ctx, input}) => {
			return ctx.prisma.scenario.create({data: input});
		}),
});