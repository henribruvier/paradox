/* 			url: `https://paradox-sand.vercel.app/api/trpc/`, */

// src/utils/trpc.ts
import {createTRPCNext} from '@trpc/next';
import {httpBatchLink} from '@trpc/client';
import type {AppRouter} from '@paradox/api';
import {transformer} from '@paradox/api/transformer';

export const trpc = createTRPCNext<any>({
	config() {
		return {
			transformer,
			links: [
				httpBatchLink({
					url: `https://paradox-sand.vercel.app/api/trpc/`,
				}),
			],
		};
	},
	ssr: false,
});
