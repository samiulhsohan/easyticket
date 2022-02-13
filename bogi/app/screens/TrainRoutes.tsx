import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import SafeView from "../components/common/SafeView";
import TitleBar from "../components/common/TitleBar";
import colors from "../styles/colors";
import globalStyles from "../styles/global";
import { TicketingStackNavProps } from "../TicketingStackParamList";
import { convertTimeToBengali } from "../utils/common";

interface TrainRoutesProps {}

const screenHorizontalPadding = 16;

const TrainRoutes: React.FC<
  TrainRoutesProps & TicketingStackNavProps<"TrainRoutes">
> = ({ route, navigation }) => {
  const { train } = route.params;

  return (
    <SafeView>
      <View style={styles.container}>
        <TitleBar
          type="back"
          statusBarBackground={colors.ACCENT}
          onPress={() => navigation.goBack()}
        >
          ট্রেন রুট
        </TitleBar>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* route info */}
          <View style={routeInfo.container}>
            <Text style={routeInfo.trainName}>{train.trn_name_bengali}</Text>
            <Text style={routeInfo.routeName}>
              {train.routes[0].int_stn_bengali} –{" "}
              {train.routes[train.routes.length - 1].int_stn_bengali}
            </Text>
          </View>
          {/* route */}
          <View style={routeList.container}>
            <View style={routeList.bar}>
              <View style={[routeList.barDot, { top: 0, left: -6 }]} />
              <View style={[routeList.barDot, { bottom: 0, left: -6 }]} />
            </View>

            <View style={routeList.routes}>
              {train.routes.map((trainRoute, index) => (
                <View
                  style={[
                    routeList.stationContainer,
                    index === 0 ? routeList.firstStation : null,
                    index === train.routes.length - 1
                      ? routeList.lastStation
                      : null,
                  ]}
                  key={trainRoute.int_stn}
                >
                  <View>
                    <View
                      style={[routeList.barDot, { top: 0, marginTop: 4 }]}
                    />
                  </View>

                  <View>
                    <Text style={routeList.stationName}>
                      {trainRoute.int_stn_bengali}
                    </Text>
                    <Text style={routeList.departureTime}>
                      {trainRoute.dpt_time
                        ? convertTimeToBengali(trainRoute.dpt_time)
                        : "-"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const routeInfo = StyleSheet.create({
  container: {
    paddingHorizontal: screenHorizontalPadding,
    paddingVertical: 16,
  },
  trainName: {
    ...globalStyles.text,
    fontSize: 28,
    color: colors.ACCENT,
  },
  routeName: {
    ...globalStyles.text,
    fontSize: 22,
    marginTop: 2,
  },
});

const routeList = StyleSheet.create({
  container: {
    paddingHorizontal: screenHorizontalPadding * 2,
    flexDirection: "row",
    marginBottom: 56,
    marginTop: 8,
  },
  bar: {
    height: "100%",
    width: 2,
    backgroundColor: colors.ACCENT,
    position: "relative",
  },
  barDot: {
    width: 14,
    height: 14,
    backgroundColor: colors.ACCENT,
    borderRadius: 100,
    position: "absolute",
    left: -32,
  },
  routes: {
    marginLeft: 24,
    marginVertical: 40,
  },
  firstStation: {},
  lastStation: {
    marginBottom: 0,
  },
  stationContainer: {
    marginBottom: 28,
  },
  stationName: {
    ...globalStyles.text,
    fontSize: 24,
  },
  departureTime: {
    ...globalStyles.text,
    fontSize: 20,
    marginTop: 2,
    color: colors.CONTENT.SECONDARY,
  },
});

export default TrainRoutes;
