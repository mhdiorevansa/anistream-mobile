import ContinueWatching from "@/components/sections/continue-watching";
import RecentlyAdded from "@/components/sections/recently-added";
import TrendingAnime from "@/components/sections/trending-anime";
import TrendingNow from "@/components/sections/trending-now";
import { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
	// pull to refresh
	const [refreshing, setRefreshing] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setRefreshKey((prev) => prev + 1);
		await new Promise((resolve) => setTimeout(resolve, 800));
		setRefreshing(false);
	}, []);

	return (
		<View className="bg-[#151718] h-full">
			{/* header home section */}
			<View className="px-5 pt-12 pb-7">
				<View className="flex-row items-center gap-x-3">
					<Image className="w-9 h-9 rounded-full" source={require("@/assets/images/icon.png")} />
					<View>
						<Text className="text-white/75 text-sm">Welcome Back,</Text>
						<Text className="text-white font-semibold">Lesto</Text>
					</View>
				</View>
			</View>
			<ScrollView
				contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
				}>
				{/* trending anime section */}
				<TrendingAnime refreshKey={refreshKey} />
				{/* continue watching section */}
				<ContinueWatching refreshKey={refreshKey} />
				{/* trending now section */}
				<TrendingNow refreshKey={refreshKey} />
				{/* recently added section */}
				<RecentlyAdded refreshKey={refreshKey} />
			</ScrollView>
		</View>
	);
}
