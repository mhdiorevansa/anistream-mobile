import OverviewAnime from "@/components/sections/overview-anime";
import { Anime } from "@/types/anime";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function AnimeDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [detailAnime, setDetailAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [tabs, setTabs] = useState<"overview" | "episodes" | "news">("overview");
	useEffect(() => {
		const fetchDetailAnime = async () => {
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
				const json = await response.json();
				if (json?.data) {
					setDetailAnime(json.data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchDetailAnime();
	}, [id]);
	if (loading) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">Loading...</Text>
			</View>
		);
	}
	if (!loading && detailAnime === null) {
		return (
			<View className="mb-7">
				<Text className="text-white/50">Anime not found</Text>
			</View>
		);
	}
	return (
		<ScrollView className="h-full">
			<View className="relative">
				<Image
					source={{
						uri:
							detailAnime?.images.webp?.large_image_url ?? detailAnime?.images.jpg.large_image_url,
					}}
					className="w-full h-[30rem] object-cover"
					resizeMode="cover"
				/>
				<LinearGradient
					colors={["rgba(21,23,24,0.85)", "rgba(21,23,24,0.3)", "rgba(21,23,24,0.9)"]}
					locations={[0, 0.5, 1]}
					className="absolute inset-0"
				/>
				<View className="absolute top-0 left-0 right-0 px-5 pt-12 pb-7">
					<View className="flex-row items-center justify-between">
						<Pressable
							onPress={() => router.back()}
							className="border border-white/30 p-3 rounded-full bg-black/30">
							<Feather name="arrow-left" color="white" size={17} />
						</Pressable>
						<Pressable
							onPress={() => console.log("like")}
							className="border border-white/30 p-3 rounded-full bg-black/30">
							<Feather name="heart" color="white" size={17} />
						</Pressable>
					</View>
				</View>
				<View className="absolute bottom-0 left-0 right-0 px-5 pb-7">
					<View className="flex-row items-center justify-between mb-2">
						<View className="w-60">
							<Text className="text-white font-semibold text-xl">{detailAnime?.title}</Text>
							<Text className="text-white/50">{detailAnime?.status}</Text>
						</View>
						<Pressable
							onPress={() => console.log("like")}
							className="border border-white/30 p-3 rounded-full bg-black/30">
							<Feather name="share-2" color="white" size={17} />
						</Pressable>
					</View>
					<View className="flex-row items-center gap-x-3">
						<View className="p-2 rounded-xl bg-white/40 backdrop-blur-xl">
							<Text className="text-white font-semibold">⭐ {detailAnime?.score ?? "-"}</Text>
						</View>
						<View className="p-2 rounded-xl bg-white/40 backdrop-blur-xl">
							<Text className="text-white font-semibold">{detailAnime?.year ?? "-"}</Text>
						</View>
						<View className="p-2 rounded-xl bg-white/40 backdrop-blur-xl">
							<Text className="text-white font-semibold">{detailAnime?.season ?? "-"}</Text>
						</View>
					</View>
				</View>
			</View>
			<View className="flex-row gap-x-7 px-5 py-7">
				<Pressable onPress={() => setTabs("overview")}>
					<Text
						className={`text-lg font-semibold ${
							tabs === "overview" ? "text-blue-500" : "text-white"
						}`}>
						Overview
					</Text>
				</Pressable>
				<Pressable onPress={() => setTabs("episodes")}>
					<Text
						className={`text-lg font-semibold ${
							tabs === "episodes" ? "text-blue-500" : "text-white"
						}`}>
						Episodes
					</Text>
				</Pressable>
				<Pressable onPress={() => setTabs("news")}>
					<Text
						className={`text-lg font-semibold ${tabs === "news" ? "text-blue-500" : "text-white"}`}>
						News
					</Text>
				</Pressable>
			</View>
			{tabs === "overview" && detailAnime?.mal_id && <OverviewAnime id={detailAnime?.mal_id} />}
		</ScrollView>
	);
}
