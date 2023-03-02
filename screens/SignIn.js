import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import appId from "../env";

export default function SignInScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");

	const signIn = async () => {
		try {
			const response = await fetch(
				"https://social-media-api-m7.herokuapp.com/api/user/signIn",
				{
					method: "POST",
					body: JSON.stringify({
						appId: appId,
						username: username,
						password: password,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const json = await response.json();

			if (response.status == 400) {
				setErrorMsg(json.errorMessage);
			}
			if (response.status == 200) {
				navigation.navigate("BottomTabs", json);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ImageBackground
				source={require("../assets/app-background.png")}
				style={styles.container}
				imageStyle={styles.appBackgrpundImage}>
				<View style={styles.upperContainer}>
					<Image
						source={require("../assets/icon.png")}
						style={styles.appIcon}
					/>
				</View>
				<View style={styles.lowerContainer}>
					<View style={styles.inpiutContainer}>
						<Text style={styles.errorMsg}>{errorMsg}</Text>
						<TextInput
							style={styles.input}
							placeholder={"Username"}
							placeholderTextColor={"#E9E9F3"}
							onChangeText={(text) => {
								setUsername(text);
								setErrorMsg("");
							}}
							value={username}
						/>
						<TextInput
							style={styles.input}
							secureTextEntry={true}
							placeholder={"Password"}
							placeholderTextColor={"#E9E9F3"}
							onChangeText={(text) => {
								setPassword(text);
								setErrorMsg("");
							}}
							value={password}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={signIn}>
							<Text style={styles.buttonText}>Sign in</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.lowerBottomContainer}>
						<View style={styles.orContainer}>
							<View style={styles.horizontalLine} />
							<Text style={[styles.greyText, { paddingHorizontal: 10 }]}>
								OR
							</Text>
							<View style={styles.horizontalLine} />
						</View>
						<View style={styles.newAccountTextContainer}>
							<Text style={styles.greyText}>Create your </Text>
							<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
								<Text style={styles.newAccountText}>SnapBuzz</Text>
							</TouchableOpacity>
							<Text style={styles.greyText}> account.</Text>
						</View>
					</View>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 100,
	},
	appBackgrpundImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	upperContainer: {
		flex: 55,
		justifyContent: "center",
		alignItems: "center",
	},
	appIcon: {
		width: "40%",
		height: "40%",
		resizeMode: "contain",
	},
	lowerContainer: {
		flex: 45,
		backgroundColor: "#6E3CDC",
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
	errorMsg: {
		color: "#ff5252",
		textAlign: "center",
	},
	inpiutContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		width: 300,
		height: 50,
		marginVertical: 12,
		padding: 10,
		borderRadius: 5,
		outline: "none",
		color: "#E9E9F3",
		borderWidth: 1,
		borderColor: "#E9E9F3",
	},
	buttonContainer: {
		alignItems: "center",
	},
	button: {
		width: 140,
		height: 45,
		backgroundColor: "#FB2576",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 16,
		color: "#E9E9F3",
		fontWeight: "500",
	},
	lowerBottomContainer: {
		justifyContent: "center",
		marginTop: "8%",
	},
	orContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	horizontalLine: {
		width: "40%",
		borderTopWidth: 1,
		alignSelf: "center",
		borderColor: "#E9E9F3",
	},
	newAccountTextContainer: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	newAccountText: {
		color: "#FF66A1",
		fontWeight: "600",
	},
	greyText: { color: "#E9E9F3" },
});
