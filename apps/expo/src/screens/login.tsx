import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from 'react-native';
import {trpc} from '../utils/trpc';
import React, {useEffect, useRef, useState} from 'react';
import {Game, Scenario} from '@prisma/client';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '@prisma/client';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/stack';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({navigation}: Props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onLogin = async () => {
		try {
			const user = await fetch('https://paradox-sand.vercel.app/api/user', {
				method: 'POST',
				body: JSON.stringify({name: username, password: password}),
			});
			if (user.status === 200) {
				user.json().then(async (data: User) => {
					if (data.role === 'admin') {
						const jsonValue = JSON.stringify(data);
						await AsyncStorage.setItem('@user_obj', jsonValue);
						navigation.navigate('Home');
					}
				});
			}
		} catch (e) {
			//@ts-expect-error - this is a custom error
			setError(e.message);
		}
	};

	return (
		<SafeAreaView>
			<View className='h-full flex items-center justify-center w-full px-2'>
				<View className='flex flex-col gap-4'>
					<Text className='text-5xl font-bold mx-auto pb-10 '>
						Login as admin
					</Text>
					<View>
						<TextInput
							placeholder='Nom'
							placeholderTextColor='#003f5c'
							onChangeText={email => setUsername(() => email)}
						/>
					</View>
					<View>
						<TextInput
							placeholder='Password.'
							placeholderTextColor='#003f5c'
							secureTextEntry={true}
							onChangeText={password => setPassword(() => password)}
						/>
					</View>
					<TouchableOpacity
						onPress={async () => await onLogin()}
						className='flex items-center justify-center bg-indigo-500 rounded-full py-2 px-4'
					>
						<Text className='font-bold text-white'>Login as admin</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};
