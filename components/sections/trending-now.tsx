import { Anime } from "@/types/anime";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

type Props = {
	refreshKey: number;
};

export default function TrendingNow({ refreshKey }: Props) {
	const [trendingNow, setTrendingNow] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchTrendingNow = async () => {
			setLoading(true);
			try {
				const response = await fetch("https://api.jikan.moe/v4/seasons/now?limit=10");
				const json = await response.json();
				if (json?.data) {
					setTrendingNow(json.data);
				}
			} catch (error) {
				console.error("fetch error:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTrendingNow();
	}, [refreshKey]);
	const getRateBgColor = (rate: number) => {
		if (rate === 1) {
			return "bg-yellow-500";
		} else if (rate === 2) {
			return "bg-zinc-500";
		} else {
			return "bg-yellow-900";
		}
	};
	if (loading) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">Loading...</Text>
			</View>
		);
	}
	if (!loading && trendingNow.length === 0) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">No have data trending now</Text>
			</View>
		);
	}
	return (
		<View className="mb-7">
			<View className="mb-2">
				<Text className="text-xl font-bold text-white">Trending Now</Text>
			</View>
			<FlatList
				data={trendingNow}
				keyExtractor={(item, index) => `${item.mal_id}-${index}`}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className="w-4" />}
				renderItem={({ item, index }) => (
					<Pressable
						onPress={() =>
							router.push({
								pathname: "/anime/[id]",
								params: { id: item.mal_id.toString() },
							})
						}
						className="w-52 relative">
						<View
							className={`absolute top-3 left-3 z-50 ${getRateBgColor(
								index + 1
							)} p-2 rounded-full`}>
							<Text className="text-white">#{index + 1}</Text>
						</View>
						<Image
							className="w-52 h-72 rounded-xl mb-2"
							source={{
								uri: item.images.webp?.large_image_url ?? item.images.jpg?.large_image_url,
							}}
							resizeMode="cover"
						/>
						<Text className="text-white mb-1">{item.title}</Text>
						<View className="flex-row flex-wrap">
							<Text className="text-white/40">{item.genres.map((g) => g.name).join(" - ")}</Text>
						</View>
					</Pressable>
				)}
			/>
		</View>
	);
}
