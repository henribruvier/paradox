import {Dialog, Transition} from '@headlessui/react';
import * as React from 'react';
import {Fragment, useState} from 'react';
import {trpc} from '../utils/trpc';

type LoginModalProps = {
	isOpen: boolean;
};

type Data = {
	name?: string;
	password?: string;
};

export const LoginModal = ({isOpen}: LoginModalProps) => {
	const [connectionType, setConnectionType] = useState<'login' | 'register'>(
		'login',
	);
	const [loginData, setLoginData] = useState<Data>();
	const [registerData, setRegisterData] = useState<Data>();
	const registerMutation = trpc.user.create.useMutation();
	const [error, setError] = useState<string>();

	const onRegister = async () => {
		try {
			await registerMutation.mutateAsync({
				name: registerData?.name as string,
				password: registerData?.password as string,
			});
		} catch (e) {
			//@ts-expect-error - this is a custom error
			setError(e.message);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={() => null}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={React.Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Login or Register
								</Dialog.Title>
								<div className='mt-2'>
									<p className='text-sm text-gray-500'>
										In order to book a session, you need to login or register.
									</p>
								</div>
								{connectionType === 'login' ? (
									<div>
										<div className='relative mb-4'>
											<label className='leading-7 text-sm text-gray-600'>
												Name
											</label>
											<input
												type='string'
												id='name'
												name='name'
												value={loginData?.name}
												onChange={e =>
													setLoginData(data => ({
														...data,
														name: e.target.value,
													}))
												}
												className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
											/>
										</div>
										<div className='relative mb-4'>
											<label className='leading-7 text-sm text-gray-600'>
												Password
											</label>
											<input
												type='string'
												id='password'
												name='password'
												value={loginData?.password}
												onChange={e =>
													setLoginData(data => ({
														...data,
														password: e.target.value,
													}))
												}
												className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
											/>
										</div>
										<div className='flex flex-col'>
											<button
												type='button'
												className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											>
												Login and book party !
											</button>
											<button
												type='button'
												onClick={() => {
													console.log('click');
													setConnectionType(() => 'register');
												}}
												className='mt-4'
											>
												<p>No account ? Register</p>
											</button>
										</div>
									</div>
								) : (
									<div>
										<div className='relative mb-4'>
											<label className='leading-7 text-sm text-gray-600'>
												Name
											</label>
											<input
												type='string'
												id='name'
												name='name'
												value={registerData?.name}
												onChange={e =>
													setRegisterData(data => ({
														...data,
														name: e.target.value,
													}))
												}
												className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
											/>
										</div>
										<div className='relative mb-4'>
											<label className='leading-7 text-sm text-gray-600'>
												Password
											</label>
											<input
												type='password'
												id='password'
												name='password'
												value={registerData?.password}
												onChange={e =>
													setRegisterData(data => ({
														...data,
														password: e.target.value,
													}))
												}
												className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
											/>
										</div>
										<div className='flex flex-col'>
											<button
												type='button'
												className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
												onClick={async () => {
													await onRegister();
												}}
											>
												Register and book party !
											</button>
											<button
												type='button'
												onClick={() => setConnectionType(() => 'login')}
												className='mt-4'
											>
												<p>Already have account ? Login</p>
											</button>
										</div>
									</div>
								)}
								{error && (
									<p className='text-red-300'>Une erreur s'est produit</p>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
