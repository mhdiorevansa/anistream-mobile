import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";

type Props = {
	id: number;
};

export default function EpisodesAnime({ id }: Props) {
	const [episodes, setEpisodes] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchEpisodesAnime = async () => {
			setLoading(true);
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos/episodes`);
				const json = await response.json();
				if (json?.data) {
					setEpisodes(json.data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchEpisodesAnime();
	}, [id]);
	if (loading) {
		return (
			<View className="px-5">
				<Text className="text-white/50">Loading...</Text>
			</View>
		);
	}
	if (!loading && episodes.length === 0) {
		return (
			<View className="px-5">
				<Text className="text-white/50">No episodes found</Text>
			</View>
		);
	}
	return (
		<ScrollView className="px-5 pb-14 h-[22rem]">
			<View className="flex-col gap-y-5">
				{episodes.map((episode) => (
					<Pressable
						onPress={() => Linking.openURL(episode.url)}
						key={episode.mal_id}
						className="flex-row gap-x-6 items-center">
						<Image
							className="w-32 h-32 rounded-xl overflow-hidden"
							source={{ uri: episode.images.jpg.image_url }}
						/>
						<View className="flex-1">
							<Text className="text-blue-500 text-lg">{episode.episode}</Text>
							<Text className="text-white text-lg">{episode.title}</Text>
						</View>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
}
