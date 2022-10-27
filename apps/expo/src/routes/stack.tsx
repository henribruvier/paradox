import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {HomeScreen} from '../screens/home';
import {LoginScreen} from '../screens/login';

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

const MyStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Login' component={LoginScreen} />
		</Stack.Navigator>
	);
};
export default MyStack;
