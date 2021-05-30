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
import { convertToBengaliNumber } from "../../../utils/common";
import { StackHeaderProps } from "@react-navigation/stack";

const statusBarHeight = Constants.statusBarHeight;

interface SearchHeaderProps {
  stackHeaderProps: StackHeaderProps;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ stackHeaderProps }) => {
  const queryState = useAppSelector(getSearchQuery);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <MaterialIcons
          style={{ padding: 4 }}
          name="arrow-back"
          size={24}
          color="#FFF"
          onPress={() => stackHeaderProps.navigation.goBack()}
        />

        <View style={{ marginLeft: 24 }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              {/* From */}
              <Text numberOfLines={1} style={[globalStyles.text, styles.title]}>
                {queryState.from.stn_name_bengali}
              </Text>

              {/* Separator */}
              <Text style={[globalStyles.text, styles.title]}>{" — "}</Text>

              {/* To */}
              <Text numberOfLines={1} style={[globalStyles.text, styles.title]}>
                {queryState.to.stn_name_bengali}
              </Text>
            </View>

            <Text
              style={[
                globalStyles.text,
                { fontSize: 18, color: "#fff", marginTop: 2 },
              ]}
            >
              {`${queryState.date.bn}, ${convertToBengaliNumber(
                (
                  queryState.passengers.adults + queryState.passengers.child
                ).toString()
              )} জন`}
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
    marginBottom: 12,
  },
  container: {
    height: 76,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#fff",
    maxWidth: 100,
  },
});

export default SearchHeader;
