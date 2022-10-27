import {createNextApiHandler} from '@trpc/server/adapters/next';
import {appRouter, createContext} from '@paradox/api';
import Cors from 'cors';
import {NextApiRequest, NextApiResponse} from 'next';

const trpcHandler = createNextApiHandler({
	router: appRouter,
	createContext: createContext,
});

const cors = Cors({
	methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function,
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	trpcHandler(req, res);
};

export default handler;
