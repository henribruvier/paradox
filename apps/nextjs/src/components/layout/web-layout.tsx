import * as React from 'react';
import {Navbar} from '../navbar';

type WebLayoutProps = {
	children: React.ReactNode;
};

export const WebLayout = ({children}: WebLayoutProps) => {
	return (
		<div className='bg-gradient-to-b from-black via-blue-900 to-black min-h-screen min-w-full'>
			<Navbar />
			{children}
		</div>
	);
};
