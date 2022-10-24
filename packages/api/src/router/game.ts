import {t} from '../trpc';
import {z} from 'zod';

export const gameRouter = t.router({
	all: t.procedure.query(({ctx}) => {
		return ctx.prisma.game.findMany();
	}),
	byId: t.procedure.input(z.number()).query(({ctx, input}) => {
		return ctx.prisma.game.findFirst({where: {id: input}});
	}),
	create: t.procedure
		.input(
			z.object({
				scenario: z.number(),
				numberOfPlayers: z.number(),
				startDate: z.date(),
				endDate: z.date(),
				room: z.number(),
			}),
		)
		.mutation(({ctx, input}) => {
			return ctx.prisma.game.create({
				data: {
					numberOfPlayers: input.numberOfPlayers,
					startDate: input.startDate,
					endDate: input.endDate,
					room: {connect: {id: input.room}},
					scenario: {connect: {id: input.scenario}},
					status: 'NOT_STARTED',
				},
			});
		}),
});
