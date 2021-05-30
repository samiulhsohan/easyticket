import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../styles/colors";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getBRConfig } from "../store/config";
import { getSearchQuery, updateSearchQuery } from "../store/search";
import { convertToBengaliNumber } from "../utils/common";

import Notice from "../components/common/Notice";
import PassengerSelector from "../components/screens/home/PassengerSelector";
import SafeView from "../components/common/SafeView";
import TitleBar from "../components/common/TitleBar";
import { TicketingStackNavProps } from "../TicketingStackParamList";
import Button from "../components/common/Button";

const PassengerCabinScreen: React.FC<TicketingStackNavProps<"Passenger">> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const queryState = useAppSelector(getSearchQuery);
  const brConfig = useAppSelector(getBRConfig);

  const [adults, setAdults] = useState(queryState.passengers.adults);
  const [child, setChild] = useState(queryState.passengers.child);

  useEffect(() => {
    dispatch(
      updateSearchQuery({
        ...queryState,
        passengers: {
          adults: adults,
          child: child,
        },
      })
    );
  }, [adults, child]);

  return (
    <SafeView>
      <View style={styles.container}>
        <TitleBar onPress={() => navigation.navigate("Home")}>
          যাত্রী সংখ্যা
        </TitleBar>

        {/* Passenger selector */}
        <View
          style={{ flex: 1, justifyContent: "space-between", marginTop: 16 }}
        >
          <View>
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
              <Notice
                type="INFO"
                title={`সর্বোচ্চ ${convertToBengaliNumber(
                  brConfig.maxSeats.toString()
                )}টি সিট নিতে পারবেন`}
              />
            </View>

            <View style={styles.passengerSelector}>
              <PassengerSelector
                count={adults}
                min={1}
                max={brConfig.maxSeats - child}
                label="প্রাপ্ত বয়স্ক"
                description="১২ বছরের উপরে"
                handleDecrease={() => setAdults(adults - 1)}
                handleIncrease={() => setAdults(adults + 1)}
              />
            </View>

            <View style={styles.passengerSelector}>
              <PassengerSelector
                count={child}
                min={0}
                max={brConfig.maxSeats - adults}
                label="অপ্রাপ্ত বয়স্ক"
                description="৩-১২ বছর"
                handleDecrease={() => setChild(child - 1)}
                handleIncrease={() => setChild(child + 1)}
              />
            </View>
          </View>

          {/* Save button */}
          <View style={{ marginHorizontal: 16, bottom: 60 }}>
            <Button variant="large" onPress={() => navigation.navigate("Home")}>
              সেভ করুন
            </Button>
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleBar: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "row",
  },
  titleBarText: {
    color: colors.CONTENT.PRIMARY,
    fontSize: 24,
    marginLeft: 24,
  },
  passengerSelector: {
    marginBottom: 25,
  },
});

export default PassengerCabinScreen;
