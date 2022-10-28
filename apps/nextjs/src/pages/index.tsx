import type {NextPage} from 'next';
import Head from 'next/head';
import {trpc} from '../utils/trpc';
import type {inferProcedureOutput} from '@trpc/server';
import type {AppRouter} from '@paradox/api';
import Link from 'next/link';
import {ScenarioCard} from '../components/scenario-card';
import {Navbar} from '../components/navbar';
import {WebLayout} from '../components/layout/web-layout';

const Home: NextPage = () => {
	const postQuery = trpc.scenario.all.useQuery();

	return (
		<>
			<WebLayout>
				<main className='container flex flex-col items-center min-h-screen  mx-auto'>
					<h1 className='text-7xl pt-10 font-bold text-gray-800'>Paradox</h1>
					<p className='font-bold pb-16 text-indigo-500'>
						Un escape-game hyper interessant
					</p>
					<div className='flex flex-col gap-2'>
						{postQuery.data?.map(post => (
							<ScenarioCard key={post.id} scenario={post} />
						))}
					</div>
				</main>
			</WebLayout>
		</>
	);
};

export default Home;
