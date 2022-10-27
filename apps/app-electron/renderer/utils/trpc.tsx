/* 			url: `https://paradox-sand.vercel.app/api/trpc/`, */

// src/utils/trpc.ts
import {createTRPCNext} from '@trpc/next';
import {httpBatchLink} from '@trpc/client';
import {transformer} from '@paradox/api/transformer';
import {ipcLink} from 'electron-trpc';

export const trpc = createTRPCNext<any>({
	config() {
		return {
			transformer,
			links: [ipcLink()],
		};
	},
	ssr: false,
});
