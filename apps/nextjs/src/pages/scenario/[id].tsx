import {prisma} from '@paradox/db';
import {GetServerSideProps} from 'next';
import {Scenario} from '@prisma/client';
import {Button} from '../../components/button';
import Link from 'next/link';

type PageProps = {
	scenario: Scenario;
};

const Page = ({scenario}: PageProps) => {
	return (
		<>
			<main className='container flex flex-col items-center justify-center min-h-screen py-16 mx-auto'>
				<h1 className='font-bold text-5xl'>{scenario.title}</h1>
				{scenario.bestTime && (
					<h2 className='font-bold text-2xl'>
						Meilleur temps : {scenario.bestTime}
					</h2>
				)}
				<Link href={{pathname: '/book', query: {scenario: scenario.title}}}>
					<a>
						<Button>Réserver</Button>
					</a>
				</Link>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const id = ctx.params?.id as string | undefined;
	if (!id) return {redirect: {destination: '/', statusCode: 303}};
	const scenario = await prisma.scenario.findUnique({
		where: {
			id: parseInt(id, 10),
		},
	});
	if (!scenario) return {redirect: {destination: '/', statusCode: 303}};
	return {
		props: {
			scenario,
		},
	};
};

export default Page;
