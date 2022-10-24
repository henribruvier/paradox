// src/server/router/index.ts
import {t} from '../trpc';

import {gameRouter} from './game';
import {userRouter} from './user';
import {roomRouter} from './room';
import {scenarioRouter} from './scenario';

export const appRouter = t.router({
	game: gameRouter,
	user: userRouter,
	room: roomRouter,
	scenario: scenarioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
