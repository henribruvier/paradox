// src/pages/api/examples.ts
import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@paradox/db';

interface UserRequest extends NextApiRequest {
	body: string;
}

const handler = async (req: UserRequest, res: NextApiResponse) => {
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
