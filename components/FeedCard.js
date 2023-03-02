import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Icon } from "@rneui/themed";

export default function FeedCard({ feed, navigation, currentUserId }) {
	const [likeStatus, setLikeStatus] = useState(feed.likes[currentUserId]);

	const handleLike = async () => {
		setLikeStatus(!likeStatus);
		try {
			const response = await fetch(
				"https://social-media-api-m7.herokuapp.com/api/feeds/likeFeed",
				{
					method: "POST",
					body: JSON.stringify({
						appId: feed.appId,
						userId: currentUserId,
						feedId: feed.feedId,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const json = await response.json();

			if (response.status == 200) {
				return json;
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<Image source={{ uri: feed.profileImage }} style={styles.profileImg} />
				<Text style={styles.username}>#{feed.username}</Text>
			</View>
			<View style={styles.middleContainer}>
				<Image source={{ uri: feed.image }} style={styles.feedImage} />
				<View style={styles.iconContainer}>
					<TouchableOpacity onPress={handleLike}>
						<Icon
							name={"heart"}
							type={"ionicon"}
							color={likeStatus === true ? "red" : "grey"}
							size={30}
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Comments", { feed: feed });
						}}>
						<Icon
							name='comment'
							type='fontisto'
							color='grey'
							size={25}
							style={styles.icon}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.lowerContainer}>
				<Text style={styles.captionText}>{feed.caption}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 350,
	},
	upperContainer: {
		flex: 15,
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
		paddingLeft: 15,
	},
	profileImg: {
		width: 50,
		height: 50,
		borderRadius: 10,
		resizeMode: "cover",
		backgroundColor: "#E9E9F3",
	},
	username: {
		paddingLeft: 10,
	},
	middleContainer: {
		flex: 75,
		borderRadius: 20,
		backgroundColor: "#E9E9F3",
		margin: 15,
		shadowColor: "#171717",
		shadowRadius: 2,
		elevation: 3,
	},
	feedImage: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
		resizeMode: "cover",
	},
	iconContainer: {
		width: "15%",
		height: "40%",
		justifyContent: "space-around",
		alignItems: "center",
		bottom: "90%",
		left: "85%",
	},
	lowerContainer: {
		flex: 10,
	},
	captionText: {
		fontSize: 13,
		fontWeight: "400",
		paddingLeft: 15,
		paddingTop: 10,
	},
});
