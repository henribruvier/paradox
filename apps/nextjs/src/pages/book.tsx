import {prisma} from '@paradox/db';
import Head from 'next/head';
import {trpc} from '../utils/trpc';
import {useRouter} from 'next/router';
import {GetServerSideProps} from 'next';
import {useState} from 'react';
import {Scenario, Price} from '@prisma/client';
import {ExclamationCircleIcon} from '@heroicons/react/20/solid';

type Props = {
	scenarios: Scenario[];
	prices: Price[];
};

const Book = ({scenarios, prices}: Props) => {
	const router = useRouter();
	const mutation = trpc.game.create.useMutation();

	const [selectedScenario, setSelectedScenario] = useState<Scenario>(
		scenarios.find(item => item.title === router.query?.scenario) ??
			scenarios[0]!,
	);
	const [numberOfPlayers, setNumberOfPlayers] = useState(2);
	const [hasNumberOfPlayersError, setHasNumberOfPlayersError] = useState(false);

	const [startDate, setStartDate] = useState(new Date());

	const {data: rooms, refetch: getAvailableRooms} =
		trpc.room.available.useQuery({
			date: startDate,
			duration: selectedScenario.duration * 60 * 1000,
		});
	console.log('rooms', rooms);

	const handleCreate = async () => {
		const duration = selectedScenario.duration * 60 * 1000;
		return;
		await mutation.mutateAsync({
			scenario: selectedScenario?.id,
			numberOfPlayers: numberOfPlayers,
			startDate: startDate,
			endDate: new Date(startDate.getTime() + duration),
			room: 1,
		});
	};

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-screen h-screen flex items-center justify-center'>
				<form className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0'>
					<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
						Réserver une partie
					</h2>

					<div className='relative mb-4 flex flex-col'>
						<label className='leading-7 text-sm text-gray-600'>
							Choisir un scénario
						</label>
						<select
							onChange={e => {
								getAvailableRooms();
								setSelectedScenario(
									() => scenarios.find(item => item.title === e.target.value)!,
								);
							}}
							className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'
						>
							{scenarios.map(scenario => (
								<option key={scenario.id} value={scenario.title}>
									{scenario.title}
								</option>
							))}
						</select>
					</div>

					<div className='relative mb-4'>
						<label
							htmlFor='numberOfPlayers'
							className='leading-7 text-sm text-gray-600'
						>
							Nombre de joueurs
						</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<input
								type='number'
								id='numberOfPlayers'
								name='numberOfPlayers'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								value={numberOfPlayers}
								aria-invalid={hasNumberOfPlayersError}
								min='2'
								max='9'
								aria-describedby='numberOfPlayers-error'
								onChange={e => {
									const value = parseInt(e.target.value, 10);
									const max = selectedScenario?.maximumPlayers ?? 20;
									const min = selectedScenario?.minimumPlayers ?? 1;
									setHasNumberOfPlayersError(() => value > max || value < min);
									setNumberOfPlayers(() => value);
								}}
							/>
							{hasNumberOfPlayersError && (
								<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
									<ExclamationCircleIcon
										className='h-5 w-5 text-red-500'
										aria-hidden='true'
									/>
								</div>
							)}
						</div>
						{hasNumberOfPlayersError && (
							<p
								className='mt-2 text-sm text-red-600'
								id='numberOfPlayers-error'
							>
								Minimum {selectedScenario?.minimumPlayers} / Maximum{' '}
								{selectedScenario?.maximumPlayers}
							</p>
						)}
					</div>

					<div className='relative mb-4'>
						<label htmlFor='date' className='leading-7 text-sm text-gray-600'>
							Date
						</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<input
								type='date'
								id='date'
								name='date'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								value={startDate.toISOString().split('T')[0]}
								min={new Date().toISOString().split('T')[0]}
								max='2023-02-14'
								onChange={e => {
									console.log(e.target.value);
									const value = new Date(e.target.value);
									setStartDate(() => value);
								}}
							/>
						</div>
					</div>

					<div className='relative mb-4'>
						<label htmlFor='date' className='leading-7 text-sm text-gray-600'>
							Heure
						</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<input
								type='time'
								id='time'
								name='time'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								value={startDate.toISOString().split('T')[0]}
								min={new Date().toISOString().split('T')[0]}
								max='2023-02-14'
								onChange={e => {
									console.log(e.target.value);
									const value = new Date(e.target.value);
									setStartDate(() => value);
								}}
							/>
						</div>
					</div>

					<div className='relative mb-4'>
						<p className='leading-7 text-sm text-gray-600'>
							Prix :{' '}
							{(prices.find(price => price.numberOfPlayers === numberOfPlayers)
								?.price ?? 25) * numberOfPlayers}{' '}
							€
						</p>
					</div>

					<div className='relative mb-4'>
						<p className='leading-7 text-sm text-gray-600'>
							Salles disponibles : {rooms?.length ?? 0}
						</p>
					</div>

					<button
						className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
						onClick={async () => await handleCreate()}
					>
						Valider
					</button>
				</form>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const scenarios = await prisma.scenario.findMany();
	const prices = await prisma.price.findMany();
	return {
		props: {
			scenarios,
			prices,
		},
	};
};

export default Book;
