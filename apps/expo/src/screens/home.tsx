import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {trpc} from '../utils/trpc';
import React, {useEffect, useRef, useState} from 'react';
import {Game, Scenario} from '@prisma/client';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export const formatDate = (
	date: string | Date,
	style?: 'long' | 'medium' | 'short',
): string =>
	Intl.DateTimeFormat('fr-FR', {timeStyle: style ? style : 'short'})
		.format(new Date(date))
		.split(' ')
		.map((str, i) => (i === 0 ? str[0].toUpperCase() + str.slice(1) : str))
		.join(' ');

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const HomeScreen = () => {
	const {data: games} = trpc.game.all.useQuery(undefined, {
		refetchInterval: 1000,
	});
	const startGameMutation = trpc.game.start.useMutation();
	const endGameMutation = trpc.game.end.useMutation();
	const changeStatusMutation = trpc.game.changeStatus.useMutation();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [expoPushToken, setExpoPushToken] = useState('');

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			token => token && setExpoPushToken(token),
		);
	}, []);

	useEffect(() => {
		const timer = setInterval(async () => {
			setCurrentDate(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const sendNotofication = async (body: string) => {
			await sendPushNotification(expoPushToken, body);
		};
		if (games) {
			games.forEach(game => {
				if (game.status === 'IN_PROGRESS') {
					if (
						game.startedAt &&
						new Date(game.startedAt.getTime() + game.scenario.duration * 1000) <
							currentDate
					) {
						changeStatusMutation.mutate({
							id: game.id,
							status: 'IN_TIME_OVER',
						});
						sendNotofication(`Jeu terminé dans la salle ${game.roomID}`);
					}
				}
			});
		}
	}, [currentDate]);

	const todaysGames = games?.filter(game => {
		const today = new Date();
		const gameDate = new Date(game.startDate);

		return (
			today.getDate() === gameDate.getDate() &&
			today.getMonth() === gameDate.getMonth() &&
			today.getFullYear() === gameDate.getFullYear()
		);
	});

	const statusToBadge = {
		NOT_STARTED: (
			<View className='bg-gray-300 py-1 px-2 rounded-full flex items-center justify-center'>
				<Text className='text-base text-white pt font-bold   '>{`not started`}</Text>
			</View>
		),
		IN_PROGRESS: (
			<View className='bg-orange-400 py-1 px-2 rounded-full flex items-center justify-center'>
				<Text className='text-base text-white pt font-bold   '>{`en cours`}</Text>
			</View>
		),
		IN_TIME_OVER: (
			<View className='bg-red-400 py-1 px-2 rounded-full flex items-center justify-center'>
				<Text className='text-base text-white pt font-bold   '>{`out of time !`}</Text>
			</View>
		),
		FINISHED: (
			<View className='bg-green-400 py-1 px-2 rounded-full flex items-center justify-center'>
				<Text className='text-base text-white pt font-bold   '>{`Terminé`}</Text>
			</View>
		),
	};
	const startGame = async (gameId: number) => {
		await startGameMutation.mutateAsync({id: gameId});
	};
	const endGame = async (
		game: Game & {
			scenario: Scenario;
		},
	) => {
		if (game.startedAt)
			await endGameMutation.mutateAsync({
				id: game.id,
				startDate: game.startedAt,
				bestTime: game.scenario.bestTime,
			});
	};

	useEffect(() => {});

	return (
		<SafeAreaView>
			<View className='h-full w-full px-2'>
				<Text className='text-5xl font-bold mx-auto pb-10 '>
					Game of <Text className='text-indigo-500'>Today</Text>
				</Text>
				<Text className='text-5xl font-bold mx-auto pb-10 '>
					<Text className='text-indigo-500'>
						{formatDate(currentDate, 'medium')}
					</Text>
				</Text>

				<ScrollView className='flex flex-col gap-3 w-auto'>
					{todaysGames?.map(game => (
						<View className='flex flex-col  items-start justify-start  border-b-2 border-indigo-300 pb-2'>
							<View className='flex flex-row w-full justify-between items-center'>
								<Text className='text-lg font-bold  pb-2'>
									{`Game:${game.id} start at ${formatDate(game.startDate)}  `}
								</Text>
								{game.status === 'NOT_STARTED' && (
									<TouchableOpacity
										onPress={async () => await startGame(game.id)}
										className='flex items-center justify-center bg-indigo-500 rounded-full py-2 px-4'
									>
										<Text className='font-bold text-white'>Start Game</Text>
									</TouchableOpacity>
								)}
								{(game.status === 'IN_PROGRESS' ||
									game.status === 'IN_TIME_OVER') && (
									<TouchableOpacity
										onPress={async () => await endGame(game)}
										className='flex items-center justify-center bg-indigo-500 rounded-full py-2 px-4'
									>
										<Text className='font-bold text-white'>End game</Text>
									</TouchableOpacity>
								)}
							</View>
							<View className='flex flex-wrap flex-row gap-2 items-center'>
								{statusToBadge[game.status]}
								<View className='flex flex-col'>
									{(game.status === 'IN_PROGRESS' ||
										game.status === 'IN_TIME_OVER') && (
										<>
											{game.startedAt && (
												<>
													<Text className='font-bold text-indigo-400'>{`started at : ${formatDate(
														game.startedAt,
													)}`}</Text>
													<Text className='font-bold text-indigo-400'>{`end : ${formatDate(
														new Date(
															game.startedAt.getTime() +
																game.scenario.duration * 1000,
														),
													)}`}</Text>
												</>
											)}
										</>
									)}
									{game.status === 'FINISHED' && (
										<Text className='font-bold text-indigo-400'>{`temps réalisé : ${
											game.timeSpent && Math.round(game.timeSpent / 60)
										} minutes`}</Text>
									)}
								</View>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string, body: string) {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'Infos Paradoxe',
		body: 'Une partie vient de se terminer',
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Device.isDevice) {
		const {status: existingStatus} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const {status} = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Device.brand === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}
