import * as React from 'react';
import {trpc} from '../utils/trpc';

type PageProps = {};

const Page = ({}: PageProps) => {
	const create = trpc.scenario.create.useMutation();
	const handleCreate = async () => {
		await create.mutate({
			title: 'test',
			description: 'test',
			duration: 10,
			minimumPlayers: 1,
			maximumPlayers: 1,
			difficulty: 'EASY',
		});
	};
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
				<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
					Create Scenario
				</h2>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Full Name</label>
					<input
						type='text'
						id='full-name'
						name='full-name'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<button className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
					Button
				</button>
				<p className='text-xs text-gray-500 mt-3'>
					Literally you probably haven't heard of them jean shorts.
				</p>
			</div>
		</div>
	);
};

export default Page;
