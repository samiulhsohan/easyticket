import React, { useEffect, useState } from "react";
import { Text, View, TouchableNativeFeedback, StyleSheet } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getBRConfig } from "../store/config";
import { getSearchQuery, updateSearchQuery } from "../store/search";
import { convertToBnDate } from "../utils/common";
import TitleBar from "../components/common/TitleBar";
import SafeView from "../components/common/SafeView";
import globalStyles from "../styles/global";
import { TicketingStackNavProps } from "../TicketingStackParamList";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../styles/colors";

const JourneyDate: React.FC<TicketingStackNavProps<"JourneyDate">> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const queryState = useAppSelector(getSearchQuery);
  const brConfig = useAppSelector(getBRConfig);
  const [dates, setDates] = useState<Dayjs[]>([]);

  const handleDateSelect = (date: Dayjs) => {
    dispatch(
      updateSearchQuery({
        ...queryState,
        date: {
          date: date.format("YYYY-MM-DD"),
          bn: convertToBnDate(date),
        },
      })
    );

    navigation.navigate("Home");
  };

  useEffect(() => {
    const _dates: Dayjs[] = [];
    let ticketDays = brConfig.advanceTicketDays;
    const currentHour = parseInt(dayjs().format("H"), 10);

    if (
      currentHour > brConfig.ticketingTime.ends ||
      currentHour < brConfig.ticketingTime.starts
    ) {
      ticketDays = ticketDays - 1;
    }

    [...Array(ticketDays)].forEach((date, index) => {
      _dates.push(dayjs().add(index, "days"));
    });

    setDates(_dates);
  }, [brConfig.advanceTicketDays, brConfig.ticketingTime]);

  return (
    <SafeView>
      <View style={styles.container}>
        <TitleBar onPress={() => navigation.navigate("Home")}>
          ভ্রমণের তারিখ
        </TitleBar>

        <View style={styles.dateContainer}>
          {dates.map((item, index) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() => handleDateSelect(item)}
            >
              <View style={styles.dateList}>
                <View style={{ width: 30 }}>
                  {queryState.date.date === item.format("YYYY-MM-DD") && (
                    <MaterialIcons
                      name="check"
                      size={18}
                      color={colors.ACCENT}
                    />
                  )}
                </View>
                <Text style={[globalStyles.text, styles.date]}>
                  {convertToBnDate(item)}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
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
  dateContainer: {
    flex: 1,
  },
  dateList: {
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 22,
  },
});

export default JourneyDate;
