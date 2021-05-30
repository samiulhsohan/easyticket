import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
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

interface RoutesProps {
  terms: {
    agreed: boolean;
    message: string;
  };
}
const TicketingStack = createStackNavigator<TicketingStackParamList>();

const Routes: React.FC<RoutesProps> = ({ terms }) => {
  return (
    <NavigationContainer>
      <TicketingStack.Navigator
        initialRouteName={terms.agreed ? "Home" : "Terms"}
      >
        <TicketingStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <TicketingStack.Screen
          name="SearchResult"
          component={SearchResultScreen}
          options={{
            header: (props) => <SearchHeader stackHeaderProps={props} />,
          }}
        />
        <TicketingStack.Screen
          name="Passenger"
          component={SelectPassengerScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
            headerShown: false,
          }}
        />
        <TicketingStack.Screen
          name="JourneyDate"
          component={JourneyDateScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
            headerShown: false,
          }}
        />
        <TicketingStack.Screen
          name="SelectStation"
          component={SelectStationScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
            headerShown: false,
          }}
          initialParams={{ type: "from" }}
        />
        <TicketingStack.Screen
          name="Terms"
          component={TermsScreen}
          options={{ headerShown: false }}
          initialParams={{ message: terms.message }}
        />
        <TicketingStack.Screen
          name="TrainDetails"
          component={TrainDetailsScreen}
          options={({ route, navigation }) => ({
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            header: () => (
              <TrainDetailsHeader route={route} navigation={navigation} />
            ),
          })}
        />
        <TicketingStack.Screen
          name="TrainRoutes"
          component={TrainRoutes}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false,
          }}
        />
      </TicketingStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
