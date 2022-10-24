// src/server/router/index.ts
import {t} from '../trpc';

import {gameRouter} from './game';
import {userRouter} from './user';

export const appRouter = t.router({
	game: gameRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
