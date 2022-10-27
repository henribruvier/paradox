// src/pages/api/trpc/[trpc].ts
import {createNextApiHandler} from '@trpc/server/adapters/next';
import {appRouter, createContext} from '@paradox/api';
import {NextApiRequest, NextApiResponse} from 'next';

// export API handler
const trpcHandler = createNextApiHandler({
	router: appRouter,
	createContext: createContext,
});

const allowCors =
	(fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Origin', '*');
		// another common pattern
		// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET,OPTIONS,PATCH,DELETE,POST,PUT',
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
		);
		if (req.method === 'OPTIONS') {
			res.status(200).end();
			return;
		}
		return await fn(req, res);
	};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	trpcHandler(req, res);
};

export default allowCors(handler);
