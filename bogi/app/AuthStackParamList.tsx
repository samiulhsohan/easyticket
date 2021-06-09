import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type AuthStackNavProps<T extends keyof AuthStackParamList> = {
  route: RouteProp<AuthStackParamList, T>;
  navigation: StackNavigationProp<AuthStackParamList, T>;
};
