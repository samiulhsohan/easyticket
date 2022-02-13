import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import SearchHeader from "./components/screens/search-result/SearchHeader";
import JourneyDateScreen from "./screens/JourneyDateScreen";
import SelectStationScreen from "./screens/SelectStationScreen";
import SelectPassengerScreen from "./screens/SelectPassengerScreen";
import TrainDetailsScreen from "./screens/TrainDetailsScreen";
import TermsScreen from "./screens/TermsScreen";
import { TicketingStackParamList } from "./TicketingStackParamList";
import TrainDetailsHeader from "./components/screens/train-details/TrainDetailsHeader";
import TrainRoutes from "./screens/TrainRoutes";
import LoginScreen from "./screens/auth/LoginScreen";

interface TicketingStackProps {
  terms: {
    agreed: boolean;
    message: string;
  };
}

const Stack = createStackNavigator<TicketingStackParamList>();

const TicketingStack: React.FC<TicketingStackProps> = ({ terms }) => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={terms.agreed ? "Home" : "Terms"}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          header: (props) => <SearchHeader stackHeaderProps={props} />,
        }}
      />
      <Stack.Screen
        name="Passenger"
        component={SelectPassengerScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JourneyDate"
        component={JourneyDateScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectStation"
        component={SelectStationScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
          headerShown: false,
        }}
        initialParams={{ type: "from" }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ headerShown: false }}
        initialParams={{ message: terms.message }}
      />
      <Stack.Screen
        name="TrainDetails"
        component={TrainDetailsScreen}
        options={({ route, navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          header: () => (
            <TrainDetailsHeader route={route} navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="TrainRoutes"
        component={TrainRoutes}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TicketingStack;
