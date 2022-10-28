import {prisma} from '@paradox/db';
import {GetServerSideProps} from 'next';
import * as React from 'react';
import {WebLayout} from '../../components/layout/web-layout';
import {Scenario, Price, Game} from '@prisma/client';
import {PencilSquareIcon} from '@heroicons/react/24/solid';
import {EditScenarioModal} from '../../components/edit-scenario-modal';
import {Button} from '../../components/button';
import Link from 'next/link';
import {unHash} from '../../utils/crypto';

type PageProps = {
	scenarios: Scenario[];
	prices: Price[];
	games: string;
};

export const formatDate = (
	date: string | Date,
	style?: 'long' | 'medium' | 'short',
): string =>
	Intl.DateTimeFormat('fr-FR', {timeStyle: style ? style : 'short'})
		.format(new Date(date))
		.split(' ')
		.map((str, i) =>
			i === 0 && str[0] ? str[0].toUpperCase() + str.slice(1) : str,
		)
		.join(' ');

const Page = ({scenarios, prices, games: _games}: PageProps) => {
	const [selectedScenario, setSelectedScenario] = React.useState<Scenario>();
	const [showModal, setShowModal] = React.useState(false);

	const games = JSON.parse(_games) as Game[];

	return (
		<WebLayout>
			<EditScenarioModal
				scenario={selectedScenario}
				isOpen={showModal}
				closeModal={() => setShowModal(false)}
			/>
			<h1 className='font-bold text-3xl text-black'>Scenarios</h1>
			<div className=' text-black items-center justify-center w-full p-4 max-w-5xl flex-col gap-3 grid grid-cols-7'>
				<p className='text-center font-bold text-lg'>Titre</p>
				<p className='text-center font-bold text-lg'>Meilleur temps</p>
				<p className='text-center font-bold text-lg'>Description</p>
				<p className='text-center font-bold text-lg'>Durée</p>
				<p className='text-center font-bold text-lg'>Max joueurs</p>
				<p className='text-center font-bold text-lg'>Min joueurs</p>
				<p className='text-center font-bold text-lg'>Edit</p>

				<div className='w-full h-0.5 bg-black col-span-7' />
				{scenarios?.map(scenario => (
					<>
						<h1 className='text-center'>{scenario.title}</h1>
						<p className='text-center'>{scenario.bestTime}</p>
						<p className='text-center'>{scenario.description}</p>
						<p className='text-center'>{scenario.duration}</p>
						<p className='text-center'>{scenario.maximumPlayers}</p>
						<p className='text-center'>{scenario.minimumPlayers}</p>
						<button
							type='button'
							onClick={() => {
								setSelectedScenario(scenario);
								setShowModal(() => true);
							}}
							className='cursor-pointer flex items-center justify-center'
						>
							<PencilSquareIcon className='w-8 h-8' />
						</button>
						<div className='w-full h-0.5 bg-black col-span-7' />
					</>
				))}
			</div>
			<div className='flex w-full items-center justify-center'>
				<Link href='/admin/create-scenario'>
					<Button>Nouveau scenario</Button>
				</Link>
			</div>
			<h1 className='font-bold text-3xl text-black mt-10'>Reservation</h1>
			<div className=' text-black items-center justify-center w-full p-4 max-w-5xl flex-col gap-3 grid grid-cols-6'>
				<p className='text-center font-bold text-lg'>Id</p>
				<p className='text-center font-bold text-lg'>Room</p>
				<p className='text-center font-bold text-lg'>StartDate</p>
				<p className='text-center font-bold text-lg'>EndDate</p>
				<p className='text-center font-bold text-lg'>StartedAt</p>
				<p className='text-center font-bold text-lg'>TimeSpent</p>

				<div className='w-full h-0.5 bg-black col-span-6' />
				{games?.map(game => (
					<>
						<h1 className='text-center'>{game.id}</h1>
						<p className='text-center font-bold'>{game.roomID}</p>
						<p className='text-center'>{formatDate(game.startDate)}</p>
						<p className='text-center'>{formatDate(game.endDate)}</p>
						<p className='text-center'>
							{game.startedAt && formatDate(game.startedAt)}
						</p>
						<p className='text-center'>
							{game.timeSpent && Math.round(game.timeSpent / 60)} mn
						</p>

						<div className='w-full h-0.5 bg-black col-span-6' />
					</>
				))}
			</div>
		</WebLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const {hash} = ctx.query;
	if (!hash)
		return {
			redirect: {
				destination: '/login-register',
				permanent: false,
			},
		};
	const id = Number.parseInt(hash as string, 10);

	const user = await prisma.user.findUnique({where: {id}});
	if (!user || user.role !== 'admin') {
		return {
			redirect: {
				destination: '/login-register',
				permanent: false,
			},
		};
	}

	const scenarios = await prisma.scenario.findMany();
	const prices = await prisma.price.findMany();
	const games = await prisma.game.findMany();
	console.log(games);

	return {
		props: {
			scenarios,
			prices,
			games: JSON.stringify(games) ?? null,
		},
	};
};

export default Page;
