import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import { Icon } from "@rneui/themed";

import CameraPermission from "./CameraPermission";

export default function CameraComponent({
	navigation,
	navigateToScreen,
	buttonName,
	userDetails,
}) {
	const [type, setType] = useState(CameraType.front);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	const [camera, setCamera] = useState({});
	const [photos, setPhotos] = useState([]);
	const [isPhotoSelected, setIsPhotoSelected] = useState(false);
	const [selectedPhoto, setSelectedPhoto] = useState("");

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return <CameraPermission requestPermission={requestPermission} />;
	}

	const toggleCameraType = () => {
		type == "back" ? setType(CameraType.front) : setType(CameraType.back);
	};

	const takePicture = async () => {
		const photo = await camera.takePictureAsync();
		w;
		setPhotos([photo, ...photos]);
	};

	const CameraImageComponet = () => {
		if (!isPhotoSelected) {
			return (
				<Camera
					style={styles.camera}
					type={type}
					ref={(r) => {
						setCamera(r);
					}}
				/>
			);
		} else {
			return (
				<Image source={{ uri: selectedPhoto }} style={styles.selectedPhoto} />
			);
		}
	};

	const CaptureRecaptureComponent = () => {
		if (!isPhotoSelected) {
			return (
				<>
					<TouchableOpacity onPress={takePicture}>
						<Icon name={"camera"} type='ionicon' color={"#6E3CDC"} size={50} />
					</TouchableOpacity>
					<TouchableOpacity onPress={toggleCameraType}>
						<Icon
							name={"flip-camera-android"}
							type='materialicon'
							color={"#6E3CDC"}
							size={50}
						/>
					</TouchableOpacity>
				</>
			);
		} else {
			return (
				<>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate(navigateToScreen, {
								user: userDetails,
								selectedPhoto: selectedPhoto,
							});
						}}>
						<Text style={styles.recaptureText}>{buttonName}</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setIsPhotoSelected(false);
							setSelectedPhoto("");
						}}>
						<Text style={styles.recaptureText}>Recapture</Text>
					</TouchableOpacity>
				</>
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>{CameraImageComponet()}</View>
			<View style={styles.middleContainer}>{CaptureRecaptureComponent()}</View>
			<View style={styles.lowerContainer}>
				<ScrollView horizontal={true}>
					{photos.map((photo) => (
						<TouchableOpacity
							onPress={() => {
								setIsPhotoSelected(true);
								setSelectedPhoto(photo["uri"]);
							}}>
							<Image
								source={{ uri: photo["uri"] }}
								style={styles.capturedPhotos}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 100,
	},
	upperContainer: {
		flex: 70,
		alignItems: "center",
		justifyContent: "center",
	},
	camera: {
		width: "85%",
		height: "85%",
		borderRadius: 30,
		overflow: "hidden",
	},
	middleContainer: {
		flex: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	lowerContainer: {
		flex: 15,
	},
	capturedPhotos: {
		width: 70,
		height: 70,
		marginLeft: 10,
		marginTop: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#6E3CDC",
	},
	selectedPhoto: {
		width: "100%",
		height: "100%",
	},
	recaptureText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#6E3CDC",
	},
});
