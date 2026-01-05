import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function TrendingNow() {
	const [trendingNow, setTrendingNow] = useState<Anime[]>([]);
	useEffect(() => {
		const fetchTrendingNow = async () => {
			try {
				const response = await fetch("https://api.jikan.moe/v4/seasons/now?limit=10");
				const json = await response.json();
				setTrendingNow(json.data);
			} catch (error) {
				throw error;
			}
		};
		fetchTrendingNow();
	}, []);
	const getRateBgColor = (rate: number) => {
		if (rate === 1) {
			return "bg-yellow-500";
		} else if (rate === 2) {
			return "bg-zinc-500";
		} else {
			return "bg-yellow-900";
		}
	};
	if (!trendingNow) return null;
	return (
		<View className="mb-7">
			<View className="mb-2">
				<Text className="text-xl font-bold text-white">Trending Now</Text>
			</View>
			<FlatList
				data={trendingNow}
				keyExtractor={(item) => item.title}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className="w-4" />}
				renderItem={({ item, index }) => (
					<View className="w-52 relative">
						<View
							className={`absolute top-3 left-3 z-50 ${getRateBgColor(
								index + 1
							)} p-2 rounded-full`}>
							<Text className="text-white">#{index + 1}</Text>
						</View>
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
