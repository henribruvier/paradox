// src/pages/_app.tsx
import '../styles/globals.css';
import type {AppType} from 'next/app';
import {trpc} from '../utils/trpc';

if (process.env.NODE_ENV === 'development') {
	import('@impulse.dev/runtime').then(impulse => impulse.run());
}

const MyApp: AppType = ({Component, pageProps}) => {
	return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
