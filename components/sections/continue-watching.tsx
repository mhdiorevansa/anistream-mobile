import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function ContinueWatching() {
	const [continueWatching, setContinueWatching] = useState<Anime[]>([]);
	useEffect(() => {
		const fetchContinueWatching = async () => {
			try {
				const response = await fetch(
					"https://api.jikan.moe/v4/anime?status=complete&order_by=end_date&sort=desc&limit=10"
				);
				const json = await response.json();
				setContinueWatching(json.data);
			} catch (error) {
				throw error;
			}
		};
		fetchContinueWatching();
	}, []);
	if (!continueWatching) return null;
	return (
		<View className="mb-7">
			<View className="flex flex-row justify-between items-center mb-2">
				<Text className="text-xl font-bold text-white">Continue Watching</Text>
				<Text className="text-blue-500">See All</Text>
			</View>
			<FlatList
				data={continueWatching}
				keyExtractor={(item) => item.title}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className="w-4" />}
				renderItem={({ item }) => (
					<View className="w-52">
						<Image
							className="w-52 h-72 rounded-xl mb-2"
							source={{
								uri: item.images.webp?.large_image_url,
							}}
							resizeMode="cover"
						/>
						<Text className="text-white mb-1">{item.title}</Text>
						<Text className="text-white/75">Episode {item.episodes}</Text>
					</View>
				)}
			/>
		</View>
	);
}
