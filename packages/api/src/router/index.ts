// src/server/router/index.ts
import {t} from '../trpc';

import {gameRouter} from './game';

export const appRouter = t.router({
	game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
