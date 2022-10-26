import {Dialog, Transition} from '@headlessui/react';
import * as React from 'react';
import {Scenario} from '@prisma/client';
import {Fragment} from 'react';
import {trpc} from '../utils/trpc';
import {useRouter} from 'next/router';

type EditScenarioModalProps = {
	scenario: Scenario | undefined;
	isOpen: boolean;
	closeModal: () => void;
};

type Body = {
	title?: string;
	description?: string;
	duration?: number;
	minimumPlayers?: number;
	maximumPlayers?: number;
	difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
};

export const EditScenarioModal = ({
	scenario,
	isOpen,
	closeModal,
}: EditScenarioModalProps) => {
	if (scenario === undefined) return null;
	const [newScenario, setNewScenario] = React.useState<Body>(scenario);
	const updateMutation = trpc.scenario.update.useMutation();
	const deleteMutation = trpc.scenario.delete.useMutation();
	const router = useRouter();

	const handleUpdate = async () => {
		try {
			const test = await updateMutation.mutateAsync({
				id: scenario.id,
				title: newScenario?.title as string,
				description: newScenario?.description as string,
				duration: newScenario?.duration as number,
				minimumPlayers: newScenario?.minimumPlayers as number,
				maximumPlayers: newScenario?.maximumPlayers as number,
				difficulty: newScenario?.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
			});
			console.log(test);
			router.reload();
		} catch (e) {
			console.log(e);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteMutation.mutateAsync(scenario.id);
			router.reload();
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={() => closeModal()}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={React.Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Editer le scenario {newScenario.title}
								</Dialog.Title>
								<div className='relative mb-4'>
									<label className='leading-7 text-sm text-gray-600'>
										Title
									</label>
									<input
										type='string'
										id='title'
										name='title'
										value={newScenario?.title}
										onChange={e =>
											setNewScenario(scenario => ({
												...scenario,
												title: e.target.value,
											}))
										}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
								</div>
								<div className='relative mb-4'>
									<label className='leading-7 text-sm text-gray-600'>
										Description
									</label>
									<input
										type='string'
										id='description'
										name=''
										value={newScenario?.description}
										onChange={e =>
											setNewScenario(scenario => ({
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
										value={newScenario?.duration}
										onChange={e =>
											setNewScenario(scenario => ({
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
										value={newScenario?.minimumPlayers}
										onChange={e =>
											setNewScenario(scenario => ({
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
										value={newScenario?.maximumPlayers}
										onChange={e =>
											setNewScenario(scenario => ({
												...scenario,
												maximumPlayers: parseInt(e.target.value, 10),
											}))
										}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
								</div>
								<div className='relative mb-4 flex flex-col'>
									<label className='leading-7 text-sm text-gray-600'>
										Difficulty
									</label>
									<select
										onChange={e =>
											setNewScenario(scenario => ({
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
								<div className='flex gap-2'>
									<button
										className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
										onClick={async () => await handleUpdate()}
									>
										Update Scenario
									</button>
									<button
										className='text-white bg-red-300 border-0 py-2 px-8 focus:outline-none hover:bg-red-200 rounded text-lg'
										onClick={async () => await handleDelete()}
									>
										Delete scenario
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
