import ContinueWatching from "@/components/sections/continue-watching";
import RecentlyAdded from "@/components/sections/recently-added";
import TrendingAnime from "@/components/sections/trending-anime";
import TrendingNow from "@/components/sections/trending-now";
import { Image, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
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
				showsVerticalScrollIndicator={false}>
				{/* trending anime section */}
				<TrendingAnime />
				{/* continue watching section */}
				<ContinueWatching />
				{/* trending now section */}
				<TrendingNow />
				{/* recently added section */}
				<RecentlyAdded />
			</ScrollView>
		</View>
	);
}
