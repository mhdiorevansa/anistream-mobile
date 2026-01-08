import { Image, Text, View } from "react-native";

export default function Header() {
	return (
		<View className="px-5 pt-12 pb-7">
			<View className="flex-row items-center gap-x-3">
				<Image className="w-9 h-9 rounded-full" source={require("@/assets/images/icon.png")} />
				<View>
					<Text className="text-white/75 text-sm">Welcome Back,</Text>
					<Text className="text-white font-semibold">Lesto</Text>
				</View>
			</View>
		</View>
	);
}
