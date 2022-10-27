import {prisma} from '@paradox/db';
import {GetServerSideProps} from 'next';
import * as React from 'react';
import {WebLayout} from '../../components/layout/web-layout';
import {Scenario, Price} from '@prisma/client';
import {PencilSquareIcon} from '@heroicons/react/24/solid';
import {EditScenarioModal} from '../../components/edit-scenario-modal';
import {Button} from '../../components/button';
import Link from 'next/link';
import {unHash} from '../../utils/crypto';

type PageProps = {
	scenarios: Scenario[];
	prices: Price[];
};

const Page = ({scenarios, prices}: PageProps) => {
	const [selectedScenario, setSelectedScenario] = React.useState<Scenario>();
	const [showModal, setShowModal] = React.useState(false);

	return (
		<WebLayout>
			<EditScenarioModal
				scenario={selectedScenario}
				isOpen={showModal}
				closeModal={() => setShowModal(false)}
			/>
			<h1 className='font-bold text-3xl text-white'>Scenarios</h1>
			<div className=' text-white items-center justify-center w-full p-4 max-w-5xl flex-col gap-3 grid grid-cols-7'>
				<p className='text-center font-bold text-lg'>Titre</p>
				<p className='text-center font-bold text-lg'>Meilleur temps</p>
				<p className='text-center font-bold text-lg'>Description</p>
				<p className='text-center font-bold text-lg'>Durée</p>
				<p className='text-center font-bold text-lg'>Max joueurs</p>
				<p className='text-center font-bold text-lg'>Min joueurs</p>
				<p className='text-center font-bold text-lg'>Edit</p>

				<div className='w-full h-0.5 bg-white col-span-7' />
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
						<div className='w-full h-0.5 bg-white col-span-7' />
					</>
				))}
			</div>
			<div className='flex w-full items-center justify-center'>
				<Link href='/admin/create-scenario'>
					<Button>Nouveau scenario</Button>
				</Link>
			</div>
			<h1 className='font-bold text-3xl text-white mt-10'>Reservation</h1>
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
	const id = Number.parseInt(await unHash(hash as string), 10);

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

	return {
		props: {
			scenarios,
			prices,
		},
	};
};

export default Page;
