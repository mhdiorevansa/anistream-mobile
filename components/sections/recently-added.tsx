import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

type Props = {
	refreshKey: number;
};

export default function RecentlyAdded({ refreshKey }: Props) {
	const [recentlyAdded, setRecentlyAdded] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchRecentlyAdded = async () => {
			setLoading(recentlyAdded === null);
			try {
				const response = await fetch(
					"https://api.jikan.moe/v4/anime?status=airing&order_by=start_date&sort=desc&limit=10"
				);
				const json = await response.json();
				if (Array.isArray(json?.data)) {
					setRecentlyAdded(json.data);
				}
			} catch (error) {
				console.error("fetch error:", error);
			}
		};
		fetchRecentlyAdded();
	}, [refreshKey, recentlyAdded]);
	if (loading) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">Loading...</Text>
			</View>
		);
	}
	return (
		<View className="mb-3">
			<View className="flex flex-row justify-between items-center mb-2">
				<Text className="text-xl font-bold text-white">Recently Added</Text>
				<Text className="text-blue-500">See All</Text>
			</View>
			<FlatList
				data={recentlyAdded}
				keyExtractor={(item, index) => `${item.mal_id}-${index}`}
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
