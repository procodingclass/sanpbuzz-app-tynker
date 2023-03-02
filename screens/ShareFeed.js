import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	TextInput,
	Platform,
} from "react-native";

import appId from "../env";

export default function ShareFeedScreen({ route, navigation }) {
	const [photo, setPhoto] = useState("");
	const [caption, setCaption] = useState("");
	const [userDetails, setUserDetails] = useState({});

	useEffect(() => {
		const { user, selectedPhoto } = route.params;
		setPhoto(selectedPhoto);
		setUserDetails(user);
	}, [route]);

	const addFeed = async () => {
		try {
			const response = await fetch(
				"https://social-media-api-m7.herokuapp.com/api/feeds/addFeed",
				{
					method: "POST",
					body: JSON.stringify({
						appId: appId,
						caption: caption,
						image: photo,
						userId: userDetails.userId,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);

			if (response.status == 200) {
				navigation.navigate("Feeds", { user: userDetails });
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.upperContainer}>
				<Image source={{ uri: photo }} style={styles.photo} />
			</View>
			<View style={styles.lowerContainer}>
				<TextInput
					style={styles.input}
					placeholder={"Add cpation..."}
					placeholderTextColor={"black"}
					onChangeText={(text) => setCaption(text)}
					value={caption}
				/>
				<TouchableOpacity style={styles.shareButton} onPress={() => addFeed()}>
					<Text style={styles.buttonText}>Share</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 100,
		backgroundColor: "#FFFFFF",
	},
	upperContainer: {
		flex: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	photo: {
		width: "80%",
		height: "80%",
		resizeMode: "stretch",
		backgroundColor: "#D0C5E2",
		borderWidth: 2,
		borderRadius: 20,
		borderColor: "#D0C5E2",
	},
	input: {
		width: "85%",
		height: 60,
		margin: 12,
		padding: 10,
		borderRadius: 15,
		borderWidth: 1,
		outline: "none",
	},
	lowerContainer: {
		flex: 50,
		alignItems: "center",
	},
	shareButton: {
		width: 140,
		height: 45,
		backgroundColor: "#FB2576",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		fontSize: 16,
		color: "#E9E9F3",
		fontWeight: "500",
	},
});
