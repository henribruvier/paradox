import * as React from 'react';
import {useRouter} from 'next/router';
import {WebLayout} from '../components/layout/web-layout';
import {User} from '@prisma/client';
import {useState} from 'react';
import {hash} from '../utils/crypto';

type Data = {
	name?: string;
	password?: string;
};

const Page = () => {
	const router = useRouter();
	const [loginData, setLoginData] = useState<Data>();
	const [error, setError] = useState<string>();

	const onLogin = async () => {
		try {
			console.log(loginData);

			const user = await fetch('/api/user', {
				method: 'POST',
				body: JSON.stringify(loginData),
			});
			if (user.status === 200) {
				user.json().then(async (data: User) => {
					if (data.role === 'admin') {
						router.push({
							pathname: '/admin',
							query: {hash: await hash(data.id.toString())},
						});
						return;
					} else {
						router.push({pathname: '/'});
						return;
					}
				});
			}
			setError('Invalid credentials');
		} catch (e) {
			//@ts-expect-error - this is a custom error
			setError(e.message);
		}
	};
	return (
		<WebLayout>
			<div className='flex items-center w-full justify-center'>
				<div className='w-full max-w-2xl bg-white p-4'>
					<div className='mt-2'>
						<p className='text-sm text-gray-500'>
							Afin d&apos;acceder à cette page vous devez etre administrateur
						</p>
					</div>

					<div>
						<div className='relative mb-4'>
							<label className='leading-7 text-sm text-gray-600'>Name</label>
							<input
								type='string'
								id='name'
								name='name'
								value={loginData?.name}
								onChange={e =>
									setLoginData(data => ({
										...data,
										name: e.target.value,
									}))
								}
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='relative mb-4'>
							<label className='leading-7 text-sm text-gray-600'>
								Password
							</label>
							<input
								type='password'
								id='password'
								name='password'
								value={loginData?.password}
								onChange={e =>
									setLoginData(data => ({
										...data,
										password: e.target.value,
									}))
								}
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='flex flex-col'>
							<button
								type='button'
								className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
								onClick={() => {
									onLogin();
								}}
							>
								Login as admin !
							</button>
						</div>
					</div>

					{error && (
						<p className='text-red-300'>Une erreur s&apos;est produit</p>
					)}
				</div>
			</div>
		</WebLayout>
	);
};

export default Page;
