// @ts-check
import {env} from './src/env/server.mjs';
import withTM from 'next-transpile-modules';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return config;
}

export default withTM(['@paradox/api', '@paradox/db'])(
	defineNextConfig({
		reactStrictMode: true,
		swcMinify: true,
		async headers() {
			return [
				{
					// matching all API routes
					source: '/api/:path*',
					headers: [
						{key: 'Access-Control-Allow-Credentials', value: 'true'},
						{
							key: 'Access-Control-Allow-Origin',
							value: ' http://localhost:8888',
						},
						{
							key: 'Access-Control-Allow-Methods',
							value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
						},
						{
							key: 'Access-Control-Allow-Headers',
							value:
								'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
						},
					],
				},
			];
		},
	}),
);
