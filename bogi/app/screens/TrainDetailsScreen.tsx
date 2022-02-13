import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import DurationDivider from "../components/icons/DurationDivider";
import { getSearchQuery, ICabin } from "../store/search";
import colors from "../styles/colors";
import globalStyles from "../styles/global";
import { TicketingStackNavProps } from "../TicketingStackParamList";
import { convertTimeToBengali, convertToBengaliNumber } from "../utils/common";
import {
  convertDurationToBengali,
  isTicketingTimeFinished,
} from "../utils/search";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import TrainCabinSelectCard from "../components/screens/train-details/TrainCabinSelectCard";
import { useAppSelector } from "../store/hooks";
import { getBRConfig } from "../store/config";
import Notice from "../components/common/Notice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_KEY } from "../constants";

interface TrainDetailsScreenProps {}

const { width } = Dimensions.get("screen");
const screenHorizontalPadding = 16;
const buttonContainerHeight = 100;

const TrainDetailsScreen: React.FC<
  TrainDetailsScreenProps & TicketingStackNavProps<"TrainDetails">
> = ({ route, navigation }) => {
  const { train } = route.params;
  const queryState = useAppSelector(getSearchQuery);
  const brConfig = useAppSelector(getBRConfig);
  const [selectedCabin, setSelectedCabin] = useState<ICabin | null>(null);
  const [ticketingTimeFinished, setTicketingTimeFinished] = useState(false);

  const getDate = (date: string) => {
    const dayjsDate = dayjs(
      `${date} ${dayjs().format("YYYY")}`,
      "dddd, DD MMMM YYYY"
    );

    const month = dayjsDate.locale("bn").format("MMMM");
    const _date = convertToBengaliNumber(dayjsDate.format("DD"));

    return `${_date} ${month}`;
  };

  const handleCabinSelect = (cabin: ICabin) => {
    setSelectedCabin(cabin);
  };

  const handleBuy = async () => {
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

    if (!authToken) {
      navigation.navigate("Login");
      return;
    }
  };

  useEffect(() => {
    setTicketingTimeFinished(
      isTicketingTimeFinished(
        brConfig.ticketingTime.starts,
        brConfig.ticketingTime.ends
      )
    );
  }, [brConfig]);

  function JourneyDetail({
    time,
    date,
    station,
  }: {
    time: string | null;
    date: string;
    station: string;
  }) {
    return (
      <View>
        <Text style={styles.time}>
          {time ? convertTimeToBengali(time) : "-"}
        </Text>
        <Text numberOfLines={1} style={styles.station}>
          {getDate(date)}
        </Text>
        <Text numberOfLines={1} style={styles.station}>
          {station}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ticketingTimeFinished && (
          <View style={{ marginTop: 12, paddingHorizontal: 12 }}>
            <Notice
              type="WARNING"
              title="টিকিট কাটার সময় শেষ"
              message={`প্রতিদিন সকাল ${convertToBengaliNumber(
                (+brConfig.ticketingTime.starts % 12 || 12).toString()
              )} টা হতে রাত ${convertToBengaliNumber(
                (+brConfig.ticketingTime.ends % 12 || 12).toString()
              )} টা পর্যন্ত টিকিট ক্রয় করতে পারবেন`}
            />
          </View>
        )}

        {/* useful button */}
        <View style={styles.usefulButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TrainRoutes", { train: train })}
          >
            <View style={styles.usefulButton}>
              <MaterialIcons
                name="location-pin"
                color={colors.ACCENT}
                size={24}
              />
              <Text style={styles.usefulButtonText}>রুট দেখুন</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* journey details */}
        <View style={styles.journeyDetailsContainer}>
          {/* departure */}
          <JourneyDetail
            time={train.dpt_time}
            date={train.jDate}
            station={train.stn_from_bengali || train.stn_from}
          />

          {/* duration */}
          <View style={styles.durationContainer}>
            {train.duration ? (
              <>
                <DurationDivider variant="left" />
                <Text style={styles.duration}>
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

          {/* arrival */}
          <View>
            <JourneyDetail
              time={train.routes[train.routes.length - 1].dpt_time}
              date={train.arrivalDate}
              station={train.stn_to_bengali || train.stn_to}
            />
          </View>
        </View>

        {/* cabins */}
        <View style={cabin.container}>
          <Text style={cabin.title}>কেবিন নির্বাচন করুন</Text>

          <View style={cabin.cabinCards}>
            {train.cabin_details.map((item) => {
              const { adults, child } = queryState.passengers;
              const { cabin, fare, available_seats } = item;
              const isRequiredSeatAvailable =
                adults + child <=
                parseInt(available_seats.total_available_seats, 10);
              const isSeatAvailable =
                available_seats.total_available_seats !== "0";

              return (
                <TrainCabinSelectCard
                  key={cabin.key}
                  cabinName={cabin.name}
                  fare={fare}
                  availableSeats={available_seats.total_available_seats}
                  onPress={() => {
                    handleCabinSelect(cabin);
                  }}
                  selected={selectedCabin?.key === cabin.key}
                  disabled={
                    !isRequiredSeatAvailable ||
                    !isSeatAvailable ||
                    ticketingTimeFinished
                  }
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={buyButton.container}>
        <Button
          disabled={!selectedCabin || ticketingTimeFinished}
          variant="large"
          onPress={handleBuy}
        >
          ক্রয় করুন
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  journeyDetailsContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  time: {
    ...globalStyles.text,
    color: colors.CONTENT.PRIMARY,
    fontSize: 22,
  },
  station: {
    ...globalStyles.text,
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
    ...globalStyles.text,
    color: colors.CONTENT.TERTIARY,
    fontSize: 18,
    marginHorizontal: 8,
  },
  usefulButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  usefulButton: {
    height: 75,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: colors.BACKGROUND.INFO,
    alignItems: "center",
    justifyContent: "center",
  },
  usefulButtonText: {
    ...globalStyles.text,
    fontSize: 20,
    marginTop: 6,
    color: colors.ACCENT,
  },
});

const cabin = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: screenHorizontalPadding,
    marginBottom: buttonContainerHeight,
  },
  title: {
    ...globalStyles.text,
    fontSize: 24,
    marginBottom: 8,
  },
  cabinCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

const buyButton = StyleSheet.create({
  container: {
    paddingHorizontal: screenHorizontalPadding,
    backgroundColor: "#FFF",
    position: "absolute",
    width: width,
    height: buttonContainerHeight,
    justifyContent: "center",
    bottom: 0,
    elevation: 8,
  },
});

export default TrainDetailsScreen;
