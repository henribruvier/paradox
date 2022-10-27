import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TRPCProvider} from './utils/trpc';

import {HomeScreen} from './screens/home';
import {NavigationContainer} from '@react-navigation/native';

import MyStack from './routes/stack';

export const App = () => {
	return (
		<NavigationContainer>
			<TRPCProvider>
				<SafeAreaProvider>
					<MyStack />
				</SafeAreaProvider>
			</TRPCProvider>
		</NavigationContainer>
	);
};
