import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";

import FeedsScreen from "../screens/Feeds";
import Comments from "../screens/Comments";
import CreateFeedScreen from "../screens/CreateFeed";
import ShareFeedScreen from "../screens/ShareFeed";
import ProfileScreen from "../screens/Profile";
import UpdateProfileImageScreen from "../screens/UpdateProfileImage";

const Stack = createStackNavigator();

function StackNavigator({ route }) {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen
				name='Feeds'
				component={FeedsScreen}
				options={{ headerShown: false }}
				initialParams={route.params}
			/>
			<Stack.Screen
				name='Comments'
				component={Comments}
				options={{ headerShown: true }}
				initialParams={route.params}
			/>
			<Stack.Screen
				name='CreateFeed'
				component={CreateFeedScreen}
				options={{ headerShown: true }}
				initialParams={route.params}
			/>
			<Stack.Screen
				name='ShareFeed'
				component={ShareFeedScreen}
				options={{ headerShown: true }}
				initialParams={route.params}
			/>
			<Stack.Screen
				name='UpdateProfileImage'
				component={UpdateProfileImageScreen}
				options={{ headerShown: false }}
				initialParams={route.params}
			/>
		</Stack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='StackNavigator'
				component={StackNavigator}
				initialParams={route.params}
				options={{
					headerShown: false,
					tabBarLabel: "ShareSnap",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='photo' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='CreateFeed'
				component={CreateFeedScreen}
				initialParams={route.params}
				options={{
					headerShown: false,
					tabBarLabel: "Create Feed",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='add-circle' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				initialParams={route.params}
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='account-circle' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
