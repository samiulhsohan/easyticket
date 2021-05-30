import * as React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useAppSelector } from "../../../store/hooks";
import colors from "../../../styles/colors";
import globalStyles from "../../../styles/global";
import { getSearchQuery } from "../../../store/search";
import { TicketingStackNavProps } from "../../../TicketingStackParamList";

const statusBarHeight = Constants.statusBarHeight;

interface TrainDetailsHeaderProps {}

const TrainDetailsHeader: React.FC<
  TrainDetailsHeaderProps & TicketingStackNavProps<"TrainDetails">
> = ({ route, navigation }) => {
  const queryState = useAppSelector(getSearchQuery);

  const { train } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <MaterialIcons
          style={{ padding: 4 }}
          name="arrow-back"
          size={24}
          color="#FFF"
          onPress={() => navigation.goBack()}
        />

        <View style={{ marginLeft: 24 }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text numberOfLines={1} style={[globalStyles.text, styles.title]}>
                {train.trn_name_bengali || train.trn_name}
              </Text>
            </View>

            <Text
              style={[
                globalStyles.text,
                { fontSize: 18, color: "#fff", marginTop: 2 },
              ]}
            >
              {`${queryState.from.stn_name_bengali} – ${queryState.to.stn_name_bengali}`}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.ACCENT,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? statusBarHeight : 0,
  },
  container: {
    height: 76,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#fff",
  },
});

export default TrainDetailsHeader;
