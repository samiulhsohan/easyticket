import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import dayjs from "dayjs";

import http from "../services/http";
import { getBRConfig } from "../store/config";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getTrainNames, getStationNames } from "../store/staticData";
import { getSearchQuery, updateSearchResult } from "../store/search";

import Notice from "../components/common/Notice";
import { ITrain, ITrainRoutes } from "../@types/search";
import SearchResultCard from "../components/screens/search-result/SearchResultCard";
import colors from "../styles/colors";
import NothingFound from "../components/common/NothingFound";
import { convertToBengaliNumber, sleep } from "../utils/common";
import { TicketingStackNavProps } from "../TicketingStackParamList";
import { isTicketingTimeFinished } from "../utils/search";

const SearchResultScreen: React.FC<TicketingStackNavProps<"SearchResult">> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const brConfig = useAppSelector(getBRConfig);
  const trainNames = useAppSelector(getTrainNames);
  const locations = useAppSelector(getStationNames);
  const queryState = useAppSelector(getSearchQuery);

  const [trains, setTrains] = useState<ITrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticketingTimeFinished, setTicketingTimeFinished] = useState(false);

  const getTrains = async () => {
    try {
      const { passengers, date, from, to, availableCabins } = queryState;
      const formatted: ITrain[] = [];

      for (const cabin of availableCabins) {
        try {
          const res = await http.get("trains", {
            params: {
              journey_date: date.date,
              from_station: from.stn_code,
              to_station: to.stn_code,
              class: cabin.key,
              adult: passengers.adults,
              child: passengers.child,
            },
          });

          res.data.forEach((d: ITrain) => {
            if (d.isTrainLeft === "YES") {
              return;
            }
            if (d.off_day === "OFF") {
              return;
            }
            if (isNaN(d.fareWithoutFormat as any)) {
              return;
            }

            const trainId = `${d.trn_no}_${d.trn_name}_${d.dpt_time}_${d.jDate}`;

            const trainIndex = formatted.findIndex(
              (item) => item.id === trainId
            );

            if (trainIndex === -1) {
              d.trn_name_bengali = trainNames[d.trn_name] || d.trn_name;
              d.stn_from_bengali = locations[d.stn_from] || d.stn_from;
              d.stn_to_bengali = locations[d.stn_to] || d.stn_to;

              d.cabin_details = [
                {
                  cabin,
                  fare: d.fareWithoutFormat,
                  available_seats: {
                    online: "",
                    counter: "",
                    counter_only: "",
                    total_available_seats: "",
                  },
                },
              ];

              const routesWithBengaliName: ITrainRoutes[] = [];

              d.routes.forEach((route) => {
                routesWithBengaliName.push({
                  ...route,
                  int_stn_bengali: locations[route.int_stn] || route.int_stn,
                });
              });

              formatted.push({
                ...d,
                id: `${d.trn_no}_${d.trn_name}_${d.dpt_time}_${d.jDate}`,
                routes: routesWithBengaliName,
              });
            } else {
              formatted[trainIndex].cabin_details.push({
                cabin,
                fare: d.fareWithoutFormat,
                available_seats: {
                  online: "",
                  counter: "",
                  counter_only: "",
                  total_available_seats: "",
                },
              });
            }
          });
        } catch (err) {
          // no need to do anything
        }

        await sleep(brConfig.apiRequestInterval);
      }

      for (const [trainIndex, train] of formatted.entries()) {
        try {
          const res = await http.post("seat-availability", {
            journey_date: queryState.date.date,
            stn_from: queryState.from.stn_code,
            stn_to: queryState.to.stn_code,
            train_no: train.trn_no,
          });

          const { DATA } = res.data;

          if (DATA.length > 0) {
            train.cabin_details.forEach((item, i) => {
              const dataCabinIndex = DATA.findIndex(
                (ci: any) => ci.CLASS === item.cabin.key
              );

              const { COUNTER_SEAT, MOBILE_SEAT, COUNTER_ONLY } =
                DATA[dataCabinIndex];

              const counterSeat = parseInt(COUNTER_SEAT, 10);
              const mobileSeat = parseInt(MOBILE_SEAT, 10);
              const isCounterOnly = COUNTER_ONLY === "Y";
              const totalAvailableSeats = isCounterOnly
                ? counterSeat.toString()
                : (counterSeat + mobileSeat).toString();

              if (dataCabinIndex !== -1) {
                formatted[trainIndex].cabin_details[i] = {
                  ...formatted[trainIndex].cabin_details[i],
                  available_seats: {
                    counter: COUNTER_SEAT,
                    online: MOBILE_SEAT,
                    total_available_seats: totalAvailableSeats,
                    counter_only: COUNTER_ONLY,
                  },
                };
              }
            });
          }
        } catch (err) {
          // no need to do anything
        }

        await sleep(brConfig.apiRequestInterval);
      }

      formatted.sort((a, b) => {
        const c: any = new Date(
          `${a.jDate} ${dayjs().format("YYYY")} ${a.dpt_time}`
        );
        const d: any = new Date(
          `${b.jDate} ${dayjs().format("YYYY")} ${b.dpt_time}`
        );
        return c - d;
      });

      dispatch(updateSearchResult(formatted));
      setTrains(formatted);
      setLoading(false);
    } catch (err) {
      // TODO: handle alert
      // eslint-disable-next-line no-alert
      alert("কিছু একটা সমস্যা হচ্ছে! কিছুক্ষণপর আবার চেষ্টা করুন");
    }
  };

  useEffect(() => {
    getTrains();
  }, [queryState]);

  useEffect(() => {
    setTicketingTimeFinished(
      isTicketingTimeFinished(
        brConfig.ticketingTime.starts,
        brConfig.ticketingTime.ends
      )
    );
  }, [brConfig]);

  return (
    <View style={styles.container}>
      {!loading && trains.length > 0 && ticketingTimeFinished && (
        <View style={{ marginBottom: 12, paddingHorizontal: 12 }}>
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

      {loading && (
        <View style={{ justifyContent: "center", marginTop: 100 }}>
          <ActivityIndicator size="large" color={colors.ACCENT} />
        </View>
      )}

      {!loading && trains.length === 0 && (
        <View style={{ marginTop: 100 }}>
          <NothingFound
            buttonText="হোমে ফিরে যান"
            showButton
            onPress={() => navigation.goBack()}
          />
        </View>
      )}

      {!loading && (
        <ScrollView style={styles.results} showsVerticalScrollIndicator={false}>
          {trains.map((train) => (
            <View key={train.id} style={{ marginBottom: 8 }}>
              <SearchResultCard
                onPress={() =>
                  navigation.navigate("TrainDetails", { train: train })
                }
                train={train}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1EF",
    flex: 1,
  },
  results: {
    paddingBottom: 100,
    flex: 1,
  },
});

export default SearchResultScreen;
