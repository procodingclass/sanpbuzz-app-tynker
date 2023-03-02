import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList, Text } from "react-native";

import FeedCard from "../components/FeedCard";

import appId from "../env";

const feedsData = [
	{
		feedId: "feed1",
		image:
			"https://c4.wallpaperflare.com/wallpaper/54/967/703/traveller-mountains-bag-wallpaper-preview.jpg",
		caption: "The little things in life matter",
		comments: {},
		likes: {
			rocksvishu008: "like",
		},
		profileImage:
			"https://c4.wallpaperflare.com/wallpaper/54/967/703/traveller-mountains-bag-wallpaper-preview.jpg",
		userId: "rocksvishu008",
	},

	{
		feedId: "feed2",
		image:
			"https://media.cntraveler.com/photos/605961ae7b588da524cfef44/master/w_4000,h_2667,c_limit/Cappadocia-GettyImages-166186583.jpg",
		caption: "The little things in life matter",
		comments: {},
		likes: {
			nidhi001: "like",
		},
		profileImage:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
		userId: "nidhi001",
	},
];

export default function FeedsScreen({ route, navigation }) {
	const [feeds, setFeeds] = useState([]);
	const [currentUserId, setCurrentUserId] = useState("");

	useEffect(() => {
		getFeeds();
		const { user } = route.params;

		setCurrentUserId(user.userId);
	}, [route]);

	const getFeeds = async () => {
		try {
			const response = await fetch(
				`https://social-media-api-m7.herokuapp.com/api/feeds/getFeeds/${appId}`
			);
			const json = await response.json();
			if (response.status == 500) {
				console.log(json.errorMessage);
			}
			if (response.status == 200) {
				setFeeds(json.feeds);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Image
					source={require("../assets/app-name.png")}
					style={styles.appName}
				/>
			</View>
			<View style={styles.lowerContainer}>
				{feeds.length > 0 ? (
					<FlatList
						data={feeds}
						renderItem={({ item }) => (
							<FeedCard
								feed={item}
								navigation={navigation}
								currentUserId={currentUserId}
							/>
						)}
						keyExtractor={(item) => item.feedId}
					/>
				) : (
					<Text style={styles.welcomeMsg}>
						Welcome to SnapBuzz add your first feed.
					</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 100,
		backgroundColor: "#FFFFFF",
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
	},
	welcomeMsg: {
		textAlign: "center",
		fontWeight: "600",
		marginTop: "60%",
		fontSize: 16,
	},
});
