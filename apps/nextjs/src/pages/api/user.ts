// src/pages/api/examples.ts
import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@paradox/db';
import Cors from 'cors';

interface UserRequest extends NextApiRequest {
	body: string;
}

const cors = Cors({
	methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = (
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function,
) => {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
};

const handler = async (req: UserRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	console.log('new request', JSON.parse(req.body));
	if (req.method !== 'POST') {
		return res.status(405).json({message: 'Method not allowed'});
	}
	const {name, password} = JSON.parse(req.body);
	try {
		const user = await prisma.user.findFirstOrThrow({
			where: {name, password},
		});
		return res.status(200).json(user);
	} catch (e) {
		return res.status(401).json({message: 'User not found'});
	}
};

export default handler;
