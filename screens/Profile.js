import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
} from "react-native";
import { Avatar } from "@rneui/themed";

import appId from "../env";

export default function ProfileScreen({ route, navigation }) {
	const [profileImage, setProfileImage] = useState(
		"https://procodingclass.github.io/tynker-vr-gamers-assets/assets/defaultProfileImage.png"
	);
	const [fullname, setFullName] = useState("");
	const [bio, setBio] = useState("");
	const [currentUser, setCurrentUser] = useState("");

	useEffect(() => {
		const { user, selectedPhoto } = route.params;
		setCurrentUser(user);
		setFullName(currentUser.name);
		setBio(user.bio);

		if (selectedPhoto) {
			user["profileImage"] = selectedPhoto;
			navigation.setParams({
				user: user,
			});
			setProfileImage(selectedPhoto);
		} else {
			setProfileImage(user.profileImage);
		}
	}, [currentUser, route, fullname]);

	const updateProfile = async () => {
		try {
			const response = await fetch(
				"https://social-media-api-m7.herokuapp.com/api/user/updateProfile",
				{
					method: "POST",
					body: JSON.stringify({
						appId: appId,
						userId: currentUser.userId,
						profileImage: profileImage,
						name: fullname,
						bio: bio,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const json = await response.json();

			if (response.status == 400) {
				console.error(json.errorMessage);
			}
			if (response.status == 200) {
				Alert.alert(json.successMessage);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<View style={styles.upperContainer}>
				<Avatar
					size={"xlarge"}
					source={{ uri: profileImage }}
					containerStyle={styles.avatarImageContainer}>
					<Avatar.Accessory
						size={30}
						onPress={() =>
							navigation.navigate("UpdateProfileImage", { user: currentUser })
						}
					/>
				</Avatar>
			</View>
			<View style={styles.lowerContainer}>
				<View style={styles.lowerMainContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.inputTitle}>Name</Text>
					</View>
					<View style={styles.inputBoxContainer}>
						<TextInput
							style={styles.input}
							placeholder={"Full name"}
							onChangeText={(text) => setFullName(text)}
							placeholderTextColor={"grey"}
							value={fullname}
						/>
					</View>
				</View>
				<View style={styles.lowerMainContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.inputTitle}>Username</Text>
					</View>
					<View style={styles.inputBoxContainer}>
						<Text style={styles.username}>{currentUser.username}</Text>
					</View>
				</View>
				<View style={styles.lowerMainContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.inputTitle}>Bio</Text>
					</View>
					<View style={styles.inputBoxContainer}>
						<TextInput
							style={styles.input}
							placeholder={"Bio"}
							placeholderTextColor={"black"}
							onChangeText={(text) => setBio(text)}
							value={bio}
						/>
					</View>
				</View>
				<TouchableOpacity style={styles.button} onPress={updateProfile}>
					<Text style={styles.buttonText}>Update Profile</Text>
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
	avatarImageContainer: {
		backgroundColor: "#E9E9F3",
		borderRadius: 10,
		shadowColor: "#171717",
		shadowRadius: 2,
		elevation: 3,
		marginTop: "13%",
	},
	lowerContainer: {
		flex: 50,
	},
	lowerMainContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	titleContainer: { flex: 30, paddingLeft: 20 },
	inputTitle: {
		fontSize: 15,
		fontWeight: "400",
	},
	inputBoxContainer: { flex: 70 },
	input: {
		width: "90%",
		height: 35,
		marginLeft: 12,
		padding: 10,
		borderRadius: 5,
		outline: "none",
		borderWidth: 1,
	},
	username: { paddingLeft: 15 },
	button: {
		width: 140,
		height: 45,
		backgroundColor: "#FB2576",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderColor: "#EE6945",
		alignSelf: "center",
		marginTop: 15,
	},
	buttonText: {
		fontSize: 16,
		color: "#E9E9F3",
		fontWeight: "500",
	},
});
