import { Anime } from "@/types/anime";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

type Props = {
	id: number;
};

export default function OverviewAnime({ id }: Props) {
	const [overview, setOverview] = useState<Anime | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchDetailAnime = async () => {
			setLoading(true);
			try {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
				const json = await response.json();
				if (json?.data) {
					setOverview(json.data);
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
		return <Text className="text-white/50 px-5">Loading...</Text>;
	}
	if (!loading && overview === null) {
		return <Text className="text-white/50 px-5">No overview found</Text>;
	}
	function getYoutubeVideoId(embedUrl?: string) {
		if (!embedUrl) return null;
		const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
		return match ? match[1] : null;
	}
	const videoId = getYoutubeVideoId(overview?.trailer?.embed_url);
	return (
		<ScrollView className="px-5 pb-14 h-[22rem]">
			{videoId && (
				<View className="w-full aspect-video rounded-xl overflow-hidden">
					<YoutubePlayer height={220} play={false} videoId={videoId} />
				</View>
			)}
			<View className={`${videoId ? "mt-5" : ""}`}>
				<Text className="text-white text-lg font-semibold mb-2">Synopsis</Text>
				<Text className="text-white/50">{overview?.synopsis}</Text>
			</View>
		</ScrollView>
	);
}
