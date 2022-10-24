import * as React from 'react';
import {trpc} from '../../utils/trpc';
import {Scenario} from '@prisma/client';

type PageProps = {};

type Body = {
	title?: string;
	description?: string;
	duration?: number;
	minimumPlayers?: number;
	maximumPlayers?: number;
	difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
};

const Page = ({}: PageProps) => {
	const mutation = trpc.scenario.create.useMutation();
	const [scenario, setScenario] = React.useState<Body>();

	const handleCreate = async () => {
		try {
			const test = await mutation.mutateAsync({
				title: scenario?.title as string,
				description: scenario?.description as string,
				duration: scenario?.duration as number,
				minimumPlayers: scenario?.minimumPlayers as number,
				maximumPlayers: scenario?.maximumPlayers as number,
				difficulty: scenario?.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
			});
			console.log(test);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0'>
				<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
					Create Scenario
				</h2>

				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Title</label>
					<input
						type='string'
						id='title'
						name='title'
						value={scenario?.title}
						onChange={e =>
							setScenario(scenario => ({...scenario, title: e.target.value}))
						}
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Description</label>
					<input
						type='string'
						id='description'
						name=''
						value={scenario?.description}
						onChange={e =>
							setScenario(scenario => ({
								...scenario,
								description: e.target.value,
							}))
						}
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>
						Duration (secondes)
					</label>
					<input
						type='number'
						id='duration'
						name=''
						value={scenario?.duration}
						onChange={e =>
							setScenario(scenario => ({
								...scenario,
								duration: parseInt(e.target.value, 10),
							}))
						}
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>
						Minimum players
					</label>
					<input
						type='number'
						id='minPlayers'
						name='minPlayers'
						value={scenario?.minimumPlayers}
						onChange={e =>
							setScenario(scenario => ({
								...scenario,
								minimumPlayers: parseInt(e.target.value, 10),
							}))
						}
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>
						Maximum players
					</label>
					<input
						type='number'
						id='maximumPlayers'
						name='maximumPlayers'
						value={scenario?.maximumPlayers}
						onChange={e =>
							setScenario(scenario => ({
								...scenario,
								maximumPlayers: parseInt(e.target.value, 10),
							}))
						}
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
				</div>
				<div className='relative mb-4 flex flex-col'>
					<label className='leading-7 text-sm text-gray-600'>Difficulty</label>
					<select
						onChange={e =>
							setScenario(scenario => ({
								...scenario,
								difficulty: e.target.value as any,
							}))
						}
						className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'
					>
						<option>EASY</option>
						<option>MEDIUM</option>
						<option>HARD</option>
					</select>
				</div>
				<button
					className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
					onClick={async () => await handleCreate()}
				>
					Create Scenario
				</button>
			</div>
		</div>
	);
};

export default Page;
