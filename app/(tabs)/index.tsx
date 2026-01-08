import ContinueWatching from "@/components/sections/continue-watching";
import Header from "@/components/sections/header";
import RecentlyAdded from "@/components/sections/recently-added";
import TrendingAnime from "@/components/sections/trending-anime";
import TrendingNow from "@/components/sections/trending-now";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

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
			{/* header section */}
			<Header />
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
