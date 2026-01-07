import { Anime } from "@/types/anime";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
	refreshKey: number;
};

export default function TrendingAnime({ refreshKey }: Props) {
	const [trendingAnime, setTrendingAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchTrendingAnime = async () => {
			setLoading(true);
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/anime");
				const json = await response.json();
				if (json?.data) {
					setTrendingAnime(json.data[0]);
				}
			} catch (error) {
				console.error("fetch error:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTrendingAnime();
	}, [refreshKey]);
	if (loading) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">Loading...</Text>
			</View>
		);
	}
	if (!loading && trendingAnime === null) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">No have data trending anime</Text>
			</View>
		);
	}
	if (!trendingAnime?.mal_id) return null;
	return (
		<View>
			<Pressable
				onPress={() =>
					router.push({
						pathname: "/anime/[id]",
						params: { id: trendingAnime?.mal_id.toString() },
					})
				}>
				<Image
					className="w-full h-80 rounded-xl mb-5"
					source={{
						uri:
							trendingAnime?.images.webp?.large_image_url ??
							trendingAnime?.images.jpg?.large_image_url,
					}}></Image>
			</Pressable>
			<View className="flex flex-row gap-3 mb-7">
				<View className="p-1 bg-blue-500 rounded-full w-32">
					<Text className="text-white text-center">Trending #1</Text>
				</View>
				<View className="p-1 bg-white/25 rounded-full w-32 backdrop-blur-md">
					<Text className="text-white text-center">Season {trendingAnime?.season}</Text>
				</View>
			</View>
			<View className="mb-5">
				<Text className="text-4xl font-bold text-white">{trendingAnime?.title}</Text>
				<Text className="text-4xl font-bold text-blue-500">Season {trendingAnime?.season}</Text>
			</View>
			<View className="flex flex-row flex-wrap items-center gap-x-3 mb-7 w-full">
				<Text className="text-white text-lg">{trendingAnime?.year} |</Text>
				<Text className="text-white text-lg">
					{trendingAnime?.genres.map((g) => g.name).join(" - ")}
				</Text>
				<Text className="text-white text-lg">| ⭐ {trendingAnime?.score}</Text>
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
