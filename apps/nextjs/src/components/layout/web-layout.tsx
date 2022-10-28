import Head from 'next/head';
import * as React from 'react';
import {Navbar} from '../navbar';

type WebLayoutProps = {
	children: React.ReactNode;
};

export const WebLayout = ({children}: WebLayoutProps) => {
	return (
		<>
			<Head>
				<title>Paradox</title>
				<meta name='description' content='Escape Game' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='bg-gradient-to-b from-white via-white to-indigo-200 min-h-screen min-w-full'>
				<Navbar />
				{children}
			</div>
		</>
	);
};
