import {createTRPCReact} from '@trpc/react';
import type {AppRouter} from '@paradox/api';

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import {transformer} from '@paradox/api/transformer';

export const TRPCProvider: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const [queryClient] = React.useState(() => new QueryClient());
	const [trpcClient] = React.useState(() =>
		trpc.createClient({
			transformer,
			links: [
				httpBatchLink({
					url: `https://paradox-sand.vercel.app/api/trpc`,
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};
