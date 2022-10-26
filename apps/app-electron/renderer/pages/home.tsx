import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {GetServerSideProps} from 'next';
import {prisma} from '@paradox/db';
import {Scenario, Price} from '@prisma/client';

type Props = {
	scenario: Scenario[];
	text: string;
};
function Home({scenario, text}: Props) {
	console.log('scenario', scenario);
	const showNotification = () => {
		const notificationTitle = 'My Notification 🔔';

		new Notification(notificationTitle, {
			body: 'This is a sample notification.',
		}).onclick = () => console.log('Notification Clicked');
	};
	showNotification();
	return (
		<React.Fragment>
			<Head>
				<title>Home - Paradox</title>
			</Head>
			<div className='grid grid-col-1 text-2xl w-full text-center'>
				<img className='ml-auto mr-auto' src='/images/logo.png' />
				<span>⚡ Electron ⚡</span>
				<span>+</span>
				<span>Next.js</span>
				<span>+</span>
				<span>tailwindcss</span>
				<span>=</span>
				<span>💕 </span>
			</div>
			<div className='mt-1 w-full flex-wrap flex justify-center'>
				<Link href='/next'>
					<a className='btn-blue'>Go to next page</a>
				</Link>
			</div>
		</React.Fragment>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const scenarios = await prisma.scenario.findMany();
	const text = 'balblaerfa';
	const prices = await prisma.price.findMany();
	return {
		props: {
			scenarios,
			prices,
			text,
		},
	};
};

export default Home;
