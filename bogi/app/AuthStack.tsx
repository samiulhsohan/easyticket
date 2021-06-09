import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "./AuthStackParamList";
import LoginScreen from "./screens/auth/LoginScreen";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
