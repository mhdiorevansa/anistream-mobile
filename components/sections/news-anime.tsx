import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";

type Props = {
	id: number;
};

export function NewsAnime({ id }: Props) {
	const [newsAnime, setNewsAnime] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchNewsAnime = async () => {
			setLoading(true);
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`);
				const json = await response.json();
				if (json?.data) {
					setNewsAnime(json.data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchNewsAnime();
	}, [id]);
	if (loading) {
		return <Text className="text-white/50 px-5">Loading...</Text>;
	}
	if (!loading && newsAnime.length === 0) {
		return <Text className="text-white/50 px-5">No news found</Text>;
	}
	return (
		<ScrollView className="px-5 h-[22rem]">
			{newsAnime.map((item) => (
				<Pressable
					onPress={() => Linking.openURL(item.url)}
					key={item.mal_id}
					className="flex-row gap-4 mb-4">
					<View className="w-24 h-24 rounded-lg overflow-hidden">
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
							<Text className="text-white/60 text-sm mt-1" numberOfLines={2}>
								{item.excerpt}
							</Text>
						</View>
						<Text className="text-white/40 text-sm mt-2">
							{item.author_username} • {new Date(item.date).toLocaleDateString("id-ID")}
						</Text>
					</View>
				</Pressable>
			))}
		</ScrollView>
	);
}
