import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IStation } from "../@types/search";
import SafeView from "../components/common/SafeView";
import http from "../services/http";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getStationNames, getCabinNames } from "../store/staticData";
import { updateSearchQuery, getSearchQuery, ICabin } from "../store/search";
import globalStyles from "../styles/global";
import colors from "../styles/colors";
import NothingFound from "../components/common/NothingFound";
import { TicketingStackNavProps } from "../TicketingStackParamList";

const SelectStationScreen: React.FC<TicketingStackNavProps<"SelectStation">> =
  ({ route, navigation }) => {
    const dispatch = useAppDispatch();
    const locationNames = useAppSelector(getStationNames);
    const queryState = useAppSelector(getSearchQuery);
    const cabinBengaliNames = useAppSelector(getCabinNames);

    const [query, setQuery] = useState("");
    const [stations, setStations] = useState<IStation[]>([]);
    const [filteredStations, setFileteredStations] = useState<IStation[]>([]);
    const [textInput, setTextInput] = useState<TextInput | null>(null);
    const [loadingStations, setLoadingStations] = useState(true);

    const getFromStations = async () => {
      try {
        const formattedStation: IStation[] = [];
        const res = await http.get("from-stations");

        res.data.forEach((station: any) => {
          formattedStation.push({
            stn_name: station.stn_name,
            stn_code: station.stn_code,
            stn_name_bengali:
              station.bng_stn || locationNames[station.stn_name],
          });
        });

        setStations(formattedStation);
        setFileteredStations(formattedStation);
        setLoadingStations(false);
      } catch (err) {
        setLoadingStations(false);
      }
    };

    const getToStations = async () => {
      try {
        const formattedStation: IStation[] = [];
        const res = await http.get(`to-stations/${queryState.from.stn_code}`);

        res.data.forEach((station: any) => {
          if (station.classes.length > 0) {
            formattedStation.push({
              stn_name: station.dest,
              stn_code: station.stn_code,
              stn_name_bengali: locationNames[station.dest] || station.dest,
              cabins: station.classes.map((item: any) => item.class),
            });
          }
        });

        setStations(formattedStation);
        setFileteredStations(formattedStation);
        setLoadingStations(false);
      } catch (err) {
        setLoadingStations(false);
      }
    };

    const handleStationSelection = (station: IStation) => {
      const { stn_code, stn_name, stn_name_bengali, cabins } = station;

      if (route.params.type === "from") {
        dispatch(
          updateSearchQuery({
            ...queryState,
            from: {
              stn_code,
              stn_name,
              stn_name_bengali: stn_name_bengali || stn_name,
            },
            to: {
              stn_code: "",
              stn_name: "",
              stn_name_bengali: "",
            },
          })
        );
      } else {
        const availableCabins: ICabin[] = [];

        if (cabins && cabins.length > 0) {
          cabins.forEach((item) => {
            availableCabins.push({
              key: item,
              name: cabinBengaliNames[item] || item,
            });
          });
        }

        dispatch(
          updateSearchQuery({
            ...queryState,
            availableCabins,
            to: {
              stn_code,
              stn_name,
              stn_name_bengali: stn_name_bengali || stn_name,
            },
          })
        );
      }

      navigation.navigate("Home");
    };

    useEffect(() => {
      if (route.params.type === "from") {
        getFromStations();
      } else {
        getToStations();
      }
    }, []);

    useEffect(() => {
      if (textInput) {
        setTimeout(() => {
          textInput.focus();
        }, 100);
      }
    }, [textInput]);

    useEffect(() => {
      const filtered = stations.filter(
        (station) =>
          station.stn_name.toLocaleLowerCase().includes(query.toLowerCase()) ||
          station.stn_name_bengali?.includes(query)
      );

      setFileteredStations(filtered);
    }, [query]);

    return (
      <SafeView>
        <View style={styles.titleBar}>
          <MaterialIcons
            name="close"
            size={24}
            color={colors.CONTENT.SECONDARY}
            onPress={() => navigation.navigate("Home")}
          />

          <View style={{ marginLeft: 24 }}>
            <TextInput
              style={[
                globalStyles.text,
                { fontSize: 24, color: colors.CONTENT.PRIMARY },
              ]}
              placeholder="স্টেশনের নাম"
              ref={(input) => {
                setTextInput(input);
              }}
              autoCompleteType="off"
              value={query}
              onChangeText={(value) => setQuery(value)}
            />
          </View>
        </View>

        {loadingStations && (
          <View style={{ justifyContent: "center", marginTop: 100 }}>
            <ActivityIndicator size="large" color={colors.ACCENT} />
          </View>
        )}

        {!loadingStations && filteredStations.length === 0 && (
          <View style={{ marginTop: 100 }}>
            <NothingFound />
          </View>
        )}

        {!loadingStations && filteredStations.length > 0 && (
          <ScrollView
            style={{ flex: 1, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {filteredStations.map((station) => (
              <TouchableNativeFeedback
                key={station.stn_code}
                onPress={() => handleStationSelection(station)}
              >
                <View style={styles.stationList}>
                  <Text
                    style={[
                      globalStyles.text,
                      { fontSize: 22, color: colors.CONTENT.PRIMARY },
                    ]}
                  >
                    {station.stn_name_bengali}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </ScrollView>
        )}
      </SafeView>
    );
  };

const styles = StyleSheet.create({
  titleBar: {
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.BORDER.OPAQUE,
    borderBottomWidth: 1,
  },
  stationList: {
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default SelectStationScreen;
