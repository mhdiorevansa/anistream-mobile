import Header from "@/components/sections/header";
import { Anime } from "@/types/anime";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function SearchScreen() {
	const [topAnime, setTopAnime] = useState<Anime[]>([]);
	const [searchResult, setSearchResult] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState<string>("");
	const fetchStatistic = async (id: number) => {
		try {
			const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/statistics`);
			const json = await response.json();
			return json?.data?.watching ?? 0;
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const fetchTopAnime = async () => {
			setLoading(true);
			try {
				const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
				const json = await response.json();
				if (json?.data) {
					const withStatistic = await Promise.all(
						json.data.map(async (anime: Anime) => {
							const statistic = await fetchStatistic(anime.mal_id);
							return { ...anime, watching: statistic };
						})
					);
					setTopAnime(withStatistic);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchTopAnime();
	}, []);
	useEffect(() => {
		const searchAnime = async (keyword: string) => {
			setLoading(true);
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime?q=${keyword}`);
				const json = await response.json();
				if (json?.data) {
					const withStatistic = await Promise.all(
						json.data.map(async (anime: Anime) => {
							const statistic = await fetchStatistic(anime.mal_id);
							return { ...anime, watching: statistic };
						})
					);
					setSearchResult(withStatistic);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		if (search.trim() === "") return;
		const delay = setTimeout(() => {
			searchAnime(search);
		}, 400);
		return () => clearTimeout(delay);
	}, [search]);
	const data = search ? searchResult : topAnime;
	return (
		<View className="bg-[#151718] h-full">
			{/* header */}
			<Header />
			<ScrollView className="px-5">
				{/* search input */}
				<TextInput
					placeholder="Search anime..."
					placeholderTextColor="#9CA3AF"
					className="bg-white/10 text-white px-4 py-3 rounded-xl"
					value={search}
					onChangeText={setSearch}
					autoCorrect={false}
				/>
				{/* top anime */}
				<View className="my-6">
					<Text className="text-white font-semibold text-lg mb-3">
						{search ? `Search Result for "${search}"` : "Top 10 Anime"}
					</Text>
					{loading && <Text className="text-white/50 mb-3">Loading...</Text>}
					{!loading && data.length === 0 && (
						<Text className="text-white/50 mb-3">No data found</Text>
					)}
					<View className="flex-col gap-4">
						{data.map((item) => (
							<Pressable
								onPress={() =>
									router.push({
										pathname: "/anime/[id]",
										params: { id: item.mal_id.toString() },
									})
								}
								key={item.mal_id}
								className="flex-row gap-4 bg-white/5 p-3 rounded-xl">
								<View className="w-20 h-28 rounded-lg overflow-hidden bg-white/10">
									<Image
										source={{ uri: item.images.jpg.image_url }}
										style={{ width: "100%", height: "100%" }}
									/>
								</View>
								<View className="flex-1 justify-between">
									<View>
										<Text className="text-white font-semibold" numberOfLines={2}>
											{item.title}
										</Text>
										<Text className="text-white/50 text-sm mt-1">
											⭐ {item.score ?? "-"} • {item.year ?? "-"}
										</Text>
										<Text className="text-white/50 text-sm mt-1">
											{new Intl.NumberFormat("en", {
												notation: "compact",
												maximumFractionDigits: 1,
											}).format(item.watching ?? 0)}{" "}
											Watching
										</Text>
									</View>
								</View>
							</Pressable>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
