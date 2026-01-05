import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function RecentlyAdded() {
	const [recentlyAdded, setRecentlyAdded] = useState<Anime[]>([]);
	useEffect(() => {
		const fetchRecentlyAdded = async () => {
			try {
				const response = await fetch(
					"https://api.jikan.moe/v4/anime?status=airing&order_by=start_date&sort=desc&limit=10"
				);
				const json = await response.json();
				setRecentlyAdded(json.data);
			} catch (error) {
				throw error;
			}
		};
		fetchRecentlyAdded();
	}, []);
	return (
		<View className="mb-3">
			<View className="flex flex-row justify-between items-center mb-2">
				<Text className="text-xl font-bold text-white">Recently Added</Text>
				<Text className="text-blue-500">See All</Text>
			</View>
			<FlatList
				data={recentlyAdded}
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
						<View className="flex-row flex-wrap">
							<Text className="text-white/40">{item.genres.map((g) => g.name).join(" - ")}</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
}
