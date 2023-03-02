import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CameraComponent from "../components/CameraComponent";

export default function CreateFeedScreen({ route, navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Image
					source={require("../assets/app-name.png")}
					style={styles.appName}
				/>
			</View>
			<View style={styles.lowerContainer}>
				<CameraComponent
					navigation={navigation}
					navigateToScreen={"ShareFeed"}
					buttonName={"Add Caption"}
					userDetails={route.params.user}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	upperContainer: {
		flex: 15,
		backgroundColor: "#E9E9F3",
	},
	appName: {
		width: 90,
		height: 70,
		resizeMode: "contain",
		marginTop: 20,
	},
	lowerContainer: {
		flex: 85,
		backgroundColor: "#FFFFFF",
	},
});
