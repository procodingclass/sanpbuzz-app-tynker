import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import BottomTabNavigator from './BottomTabs';

const Stack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
