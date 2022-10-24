import {t} from '../trpc';
import {z} from 'zod';

export const gameRouter = t.router({
	all: t.procedure.query(({ctx}) => {
		return ctx.prisma.game.findMany();
	}),
	byId: t.procedure.input(z.string()).query(({ctx, input}) => {
		return ctx.prisma.game.findFirst({where: {id: input}});
	}),
	create: t.procedure
		.input(
			z.object({
				title: z.string(),
				content: z.string(),
				numberOfPlayers: z.number(),
				reservationDate: z.string(),
				scenario: z.string(),
				room: z.number(),
			}),
		)
		.mutation(({ctx, input}) => {
			return ctx.prisma.game.create({data: {...input, status: 'NOT_STARTED'}});
		}),
});
