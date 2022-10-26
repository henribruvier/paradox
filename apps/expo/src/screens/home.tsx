import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import type {inferProcedureOutput} from '@trpc/server';
import type {AppRouter} from '@paradox/api';
import {trpc} from '../utils/trpc';
import React from 'react';

const CreatePost: React.FC = () => {
	return <View className='p-4 border-t-2 border-gray-500 flex flex-col'></View>;
};

export const HomeScreen = () => {
	const [showPost, setShowPost] = React.useState<string | null>(null);
	const {data: games} = trpc.game.all.useQuery();

	return (
		<SafeAreaView>
			<View className='h-full w-full p-4'>
				<Text className='text-5xl font-bold mx-auto pb-2'>
					Create <Text className='text-indigo-500'>T3</Text> Turbo
				</Text>
				{games?.map(game => (
					<Text className='text-5xl font-bold mx-auto pb-2'>{game.id}</Text>
				))}

				<View className='py-2'>
					{showPost ? (
						<Text>
							<Text className='font-semibold'>Selected post:</Text>
							{showPost}
						</Text>
					) : (
						<Text className='italic font-semibold'>Press on a post</Text>
					)}
				</View>

				<CreatePost />
			</View>
		</SafeAreaView>
	);
};
