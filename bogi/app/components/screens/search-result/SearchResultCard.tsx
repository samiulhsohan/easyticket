import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
require("dayjs/locale/bn");
import colors from "../../../styles/colors";
import globalStyles from "../../../styles/global";
import { ITrain } from "../../../@types/search";
import {
  convertToBengaliNumber,
  convertTimeToBengali,
} from "../../../utils/common";
import { convertDurationToBengali } from "../../../utils/search";
import dayjs from "dayjs";
import DurationDivider from "../../icons/DurationDivider";
import { MaterialIcons } from "@expo/vector-icons";

export interface SearchResultCardProps {
  train: ITrain;
  onPress: () => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  train,
  onPress,
}) => {
  const getOverflowDate = () => {
    const dayjsDate = dayjs(
      `${train.arrivalDate} ${dayjs().format("YYYY")}`,
      "dddd, DD MMMM YYYY"
    );

    const month = dayjsDate.locale("bn").format("MMMM");
    const date = convertToBengaliNumber(dayjsDate.format("DD"));

    return `${date} ${month}`;
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text
          style={[
            globalStyles.text,
            styles.trainName,
            { paddingHorizontal: 12 },
          ]}
        >
          {train.trn_name_bengali || train.trn_name} (
          {convertToBengaliNumber(train.trn_no.replace(".", ""))})
        </Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.timeContainer}>
            <View>
              <Text style={[globalStyles.text, styles.time]}>
                {convertTimeToBengali(train.dpt_time)}
              </Text>
              <Text
                numberOfLines={1}
                style={[globalStyles.text, styles.station]}
              >
                {train.stn_from_bengali || train.stn_from}
              </Text>
            </View>

            <View style={styles.durationContainer}>
              {train.duration ? (
                <>
                  <DurationDivider variant="left" />
                  <Text style={[globalStyles.text, styles.duration]}>
                    {convertDurationToBengali(train.duration)}
                  </Text>
                  <DurationDivider variant="right" />
                </>
              ) : (
                <MaterialIcons
                  name="arrow-right-alt"
                  size={24}
                  color={colors.CONTENT.TERTIARY}
                />
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={[globalStyles.text, styles.time]}>
                  {train.routes[train.routes.length - 1].dpt_time
                    ? convertTimeToBengali(
                        train.routes[train.routes.length - 1].dpt_time!
                      )
                    : "-"}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[globalStyles.text, styles.station]}
                >
                  {train.stn_to_bengali || train.stn_to}
                </Text>
              </View>

              {train.arrivalDate !== train.jDate && (
                <View>
                  <Text style={[globalStyles.text, styles.overflowDate]}>
                    {getOverflowDate()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            marginTop: 12,
            paddingHorizontal: 12,
          }}
        >
          {train.cabin_details.map((item) => (
            <View key={item.cabin.key}>
              <View style={[styles.cabinContainer]}>
                <Text
                  numberOfLines={1}
                  style={[globalStyles.text, styles.cabinName]}
                >
                  {item.cabin.name}
                </Text>
                <Text style={[globalStyles.text, styles.cabinPrice]}>
                  ৳{convertToBengaliNumber(item.fare)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_B,
    paddingVertical: 14,
  },
  trainName: {
    fontSize: 22,
    color: colors.ACCENT,
  },
  timeContainer: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  time: {
    color: colors.CONTENT.PRIMARY,
    fontSize: 22,
  },
  station: {
    color: colors.CONTENT.TERTIARY,
    fontSize: 18,
    marginTop: 2,
    maxWidth: 100,
  },
  durationContainer: {
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  duration: {
    color: colors.CONTENT.TERTIARY,
    fontSize: 18,
    marginHorizontal: 8,
  },
  cabinContainer: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.BACKGROUND.DISABLED,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 8,
    width: 110,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  cabinName: {
    fontSize: 18,
    color: colors.CONTENT.PRIMARY,
    width: "100%",
  },
  cabinPrice: {
    fontSize: 20,
    color: colors.CONTENT.PRIMARY,
  },
  overflowDate: {
    color: colors.CONTENT.NEGATIVE,
    fontSize: 15,
    marginLeft: 3,
  },
});

export default SearchResultCard;
