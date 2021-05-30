import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import { useAppSelector } from "../store/hooks";
import { getSearchQuery } from "../store/search";

import SafeView from "../components/common/SafeView";
import colors from "../styles/colors";
import globalStyles from "../styles/global";
import { convertToBengaliNumber } from "../utils/common";
import { TicketingStackNavProps } from "../TicketingStackParamList";
import Button from "../components/common/Button";

const HomeScreen: React.FC<TicketingStackNavProps<"Home">> = ({
  navigation,
}) => {
  const queryState = useAppSelector(getSearchQuery);

  const handleSearch = () => {
    let alertMessage = "";

    if (!queryState.to.stn_code) {
      alertMessage = "যে স্টেশনে যাবেন সেটি নির্বাচন করুন";
    }

    if (!queryState.from.stn_code) {
      alertMessage = "যে স্টেশন থেকে যাত্রা শুরু করবেন সেটি নির্বাচন করুন";
    }

    if (alertMessage) {
      Alert.alert("", alertMessage, [
        {
          text: "ওকে",
        },
      ]);

      return;
    }

    navigation.navigate("SearchResult");
  };

  return (
    <SafeView>
      <View>
        <View style={styles.searchContainer}>
          <View>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("SelectStation", {
                  type: "from",
                })
              }
            >
              <View style={styles.queryFieldContainer}>
                <Text style={[globalStyles.text, styles.queryLabel]}>
                  আরম্ভ
                </Text>

                {queryState.from.stn_name_bengali ? (
                  <Text style={[globalStyles.text, styles.queryText]}>
                    {queryState.from.stn_name_bengali}
                  </Text>
                ) : (
                  <Text
                    style={[
                      globalStyles.text,
                      styles.queryText,
                      { color: colors.CONTENT.TERTIARY },
                    ]}
                  >
                    নির্বাচন করুন
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                queryState.from.stn_code
                  ? navigation.navigate("SelectStation", {
                      type: "to",
                    })
                  : Alert.alert(
                      "",
                      "গন্তব্য নির্বাচন করতে যে স্টেশন থেকে যাত্রা করবেন সেটি আগে সিলেক্ট করুন",
                      [
                        {
                          text: "ওকে",
                        },
                      ]
                    )
              }
            >
              <View style={styles.queryFieldContainer}>
                <Text style={[globalStyles.text, styles.queryLabel]}>
                  গন্তব্য
                </Text>

                {queryState.to.stn_name_bengali ? (
                  <Text style={[globalStyles.text, styles.queryText]}>
                    {queryState.to.stn_name_bengali}
                  </Text>
                ) : (
                  <Text
                    style={[
                      globalStyles.text,
                      styles.queryText,
                      { color: colors.CONTENT.TERTIARY },
                    ]}
                  >
                    নির্বাচন করুন
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 2, marginRight: 16 }}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("JourneyDate")}
                >
                  <View style={styles.queryFieldContainer}>
                    <Text style={[globalStyles.text, styles.queryLabel]}>
                      ভ্রমণের তারিখ
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[globalStyles.text, styles.queryText]}
                    >
                      {queryState.date.bn}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={{ flex: 1.5 }}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Passenger")}
                >
                  <View style={[styles.queryFieldContainer]}>
                    <Text style={[globalStyles.text, styles.queryLabel]}>
                      যাত্রী সংখ্যা
                    </Text>
                    <Text style={[globalStyles.text, styles.queryText]}>
                      {convertToBengaliNumber(
                        (
                          queryState.passengers.adults +
                          queryState.passengers.child
                        ).toString()
                      )}{" "}
                      জন
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          <View>
            <Button variant="large" onPress={handleSearch}>
              টিকিট খুঁজুন
            </Button>
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  searchButtonContainer: {
    backgroundColor: colors.ACCENT,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  queryFieldContainer: {
    height: 77,
    borderColor: colors.BORDER.OPAQUE,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  queryLabel: {
    color: "#4C4C4C",
    fontSize: 22,
  },
  queryText: {
    color: colors.CONTENT.PRIMARY,
    fontSize: 27,
    marginTop: 4,
    width: "100%",
  },
});

export default HomeScreen;
