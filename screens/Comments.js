import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import appId from "../env";

const commentsData = [
	{
		commentId: "comment1",
		feedId: "feed1",
		appId: "app1",
		userId: "user1",
		username: "nidhi002",
		comment: "Awesome Bro!😘😘😘😘😘",
		profileImage:
			"https://c4.wallpaperflare.com/wallpaper/54/967/703/traveller-mountains-bag-wallpaper-preview.jpg",
	},
	{
		commentId: "comment2",
		feedId: "feed1",
		appId: "app1",
		userId: "user2",
		username: "omkarRokcy007",
		comment: "Awesome Bro!😘😘😘😘😘",
		profileImage:
			"https://c4.wallpaperflare.com/wallpaper/54/967/703/traveller-mountains-bag-wallpaper-preview.jpg",
	},
];

export default function CommentsScreen({ route, navigation }) {
	const [currentUser, setCurrentUser] = useState({});
	const [selectedFeed, setSelectedFeed] = useState({});

	const [allComments, setAllComments] = useState([]);
	const [comment, setComment] = useState("");

	useEffect(() => {
		let { user, feed } = route.params;

		setSelectedFeed(feed);
		setCurrentUser(user);

		getComments();
	}, [selectedFeed, currentUser]);

	const getComments = async () => {
		try {
			const response = await fetch(
				`https://social-media-api-m7.herokuapp.com/api/feeds/getComments/${appId}/${selectedFeed.feedId}`
			);

			const json = await response.json();

			if (response.status == 500) {
				console.error(json.errorMessage);
			}
			if (response.status == 200) {
				setAllComments(json.comments);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const addComments = async () => {
		let newComment = {
			appId: appId,
			username: currentUser.username,
			userId: currentUser.userId,
			comment: comment,
			feedId: selectedFeed.feedId,
			profileImage: currentUser.profileImage,
		};
		setAllComments([newComment, ...allComments]);
		setComment("");

		try {
			const response = await fetch(
				"https://social-media-api-m7.herokuapp.com/api/feeds/addComment",
				{
					method: "POST",
					body: JSON.stringify(newComment),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);

			if (response.status == 400) {
				console.error(json.errorMessage);
			}
			if (response.status == 200) {
				return response.json();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
			keyboardVerticalOffset={65}>
			<View style={styles.upperContainer}>
				{allComments.length <= 0 ? (
					<View style={styles.emptyCommentsContainer}>
						<Text style={styles.emptyCommentTitle}>No comments yet.</Text>
						<Text style={styles.emptyCommentSubtitle}>
							Start the conversation.
						</Text>
					</View>
				) : (
					<ScrollView>
						{allComments.map((item) => (
							<View key={item.commentId} style={styles.commentContainer}>
								<Image
									source={{ uri: item.profileImage }}
									style={styles.commentProfileImage}
								/>
								<View>
									<Text style={styles.username}>{item.username}</Text>
									<Text style={styles.commentText}>{item.comment}</Text>
								</View>
							</View>
						))}
					</ScrollView>
				)}
			</View>
			<View style={styles.lowerContainer}>
				<Image
					source={{
						uri: currentUser.profileImage,
					}}
					style={styles.lowerProfileImage}
				/>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={(text) => setComment(text)}
						placeholder={"Add a comment for " + currentUser.username}
						placeholderTextColor={"black"}
						style={styles.input}
						value={comment}
					/>
					<View style={styles.postButtonContainer}>
						<TouchableOpacity onPress={addComments}>
							<Text style={styles.postButtonText}>POST</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 100,
		backgroundColor: "#FFFFFF",
	},
	upperContainer: { flex: 90 },
	emptyCommentsContainer: {
		flex: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyCommentTitle: { fontSize: 20, fontWeight: "700" },
	emptyCommentSubtitle: {
		fontSize: 13,
		fontWeight: "400",
		paddingTop: 20,
	},
	commentContainer: {
		width: "100%",
		height: 70,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#E9E9F3",
	},
	commentProfileImage: {
		width: 50,
		height: 50,
		borderRadius: 10,
		alignSelf: "center",
		marginLeft: "10%",
		backgroundColor: "#D0C5E2",
	},
	username: {
		fontSize: 16,
		paddingTop: 20,
		paddingLeft: 15,
	},
	commentText: {
		fontSize: 11,
		paddingTop: 5,
		paddingLeft: 15,
	},
	lowerContainer: {
		flex: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderTopWidth: 1,
	},
	lowerProfileImage: {
		width: 50,
		height: 50,
		borderRadius: 10,
		backgroundColor: "#D0C5E2",
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	input: {
		width: "80%",
		height: 50,
		padding: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		outline: "none",
		fontSize: 13,
	},
	postButtonContainer: {
		width: 50,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	postButtonText: {
		fontWeight: "600",
	},
});
