import {t} from '../trpc';
import {z} from 'zod';

export const roomRouter = t.router({
	all: t.procedure.query(({ctx}) => {
		return ctx.prisma.room.findMany();
	}),
	byId: t.procedure.input(z.number()).query(({ctx, input}) => {
		return ctx.prisma.room.findFirst({where: {id: input}});
	}),
});
