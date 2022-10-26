// src/pages/api/trpc/[trpc].ts
import {createNextApiHandler} from '@trpc/server/adapters/next';
import {appRouter, createContext} from '@paradox/api';
import {NextApiRequest, NextApiResponse} from 'next';

// export API handler
const trpcHandler = createNextApiHandler({
	router: appRouter,
	createContext: createContext,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Access-Control-Allow-Origin', '');
	res.setHeader('Access-Control-Request-Method', '');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		return res.end();
	}
	trpcHandler(req, res);
};

export default handler;
