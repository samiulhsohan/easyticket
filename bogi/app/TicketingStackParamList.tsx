import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ITrain } from "./@types/search";

export type TicketingStackParamList = {
  Home: undefined;
  SearchResult: undefined;
  Passenger: undefined;
  JourneyDate: undefined;
  SelectStation: { type: "from" | "to" };
  Terms: { message: string };
  TrainDetails: { train: ITrain };
  TrainRoutes: { train: ITrain };
  Login: undefined;
};

export type TicketingStackNavProps<T extends keyof TicketingStackParamList> = {
  route: RouteProp<TicketingStackParamList, T>;
  navigation: StackNavigationProp<TicketingStackParamList, T>;
};
