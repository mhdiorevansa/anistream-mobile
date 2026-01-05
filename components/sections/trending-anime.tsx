import { Anime } from "@/types/anime";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function TrendingAnime() {
	const [trendingAnime, setTrendingAnime] = useState<Anime | null>(null);
	useEffect(() => {
		const fetchTrendingAnime = async () => {
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/anime");
				const json = await response.json();
				const mapped = json.data[0];
				setTrendingAnime(mapped);
			} catch (error) {
				throw error;
			}
		};
		fetchTrendingAnime();
	}, []);
	if (!trendingAnime) return null;
	return (
		<View>
			<Image
				className="w-full h-80 rounded-xl mb-5"
				source={{
					uri: trendingAnime.images.webp?.large_image_url,
				}}></Image>
			<View className="flex flex-row gap-3 mb-7">
				<View className="p-1 bg-blue-500 rounded-full w-32">
					<Text className="text-white text-center">Trending #1</Text>
				</View>
				<View className="p-1 bg-white/25 rounded-full w-32 backdrop-blur-md">
					<Text className="text-white text-center">Season {trendingAnime.season}</Text>
				</View>
			</View>
			<View className="mb-5">
				<Text className="text-4xl font-bold text-white">{trendingAnime.title}</Text>
				<Text className="text-4xl font-bold text-blue-500">Season {trendingAnime.season}</Text>
			</View>
			<View className="flex flex-row flex-wrap items-center gap-x-3 mb-7 w-full">
				<Text className="text-white text-lg">{trendingAnime.year} |</Text>
				<Text className="text-white text-lg">
					{trendingAnime.genres.map((g) => g.name).join(" - ")}
				</Text>
				<Text className="text-white text-lg">| ⭐ {trendingAnime.score}</Text>
			</View>
			<View className="flex-row gap-2 mb-7">
				<Pressable className="flex-1 bg-blue-500 p-3 rounded-xl flex-row items-center justify-center gap-2">
					<Feather name="play" color="white" size={17} />
					<Text className="text-white">Play Now</Text>
				</Pressable>
				<Pressable className="w-14 bg-white/25 p-3 rounded-xl items-center justify-center">
					<Feather name="bookmark" color="white" size={17} />
				</Pressable>
			</View>
		</View>
	);
}
