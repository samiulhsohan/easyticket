import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { Restart } from "fiction-expo-restart";
import Constants from "expo-constants";
import store from "./app/store/configureStore";
import { useAppDispatch } from "./app/store/hooks";
import {
  updateCabinNames,
  updateStationNames,
  updateTrainNames,
} from "./app/store/staticData";
import { updateAppConfig, updateBRConfig } from "./app/store/config";
import Routes from "./app/Routes";
import { getInitialData } from "./app/services/intialData";
import ErrorScreen from "./app/screens/ErrorScreen";
import AppOutdatedScreen from "./app/screens/AppOutdatedScreen";
import {
  useFonts as useInterFonts,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useAppDispatch();
  const [fontsLoaded] = useFonts({
    Noirrit: require("./app/assets/fonts/noirrit.ttf"),
  });

  const [interFontLoaded] = useInterFonts({
    "Inter-Medium": Inter_500Medium,
  });

  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [isInitialDataError, setIsInitialDataError] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsMessage, setTermsMessage] = useState("");
  const [appOutdated, setAppOutdated] = useState(false);

  const loadInitialData = async () => {
    try {
      const termsAgreedStorage = await AsyncStorage.getItem("@termsAgreed");

      const initialData = await getInitialData();

      const {
        config,
        trainNames,
        stationNames,
        cabinNames,
        termsMessage: terms,
      } = initialData;

      dispatch(updateAppConfig(config.app));
      dispatch(updateBRConfig(config.br));
      dispatch(updateTrainNames(trainNames));
      dispatch(updateStationNames(stationNames));
      dispatch(updateCabinNames(cabinNames));
      setTermsMessage(terms);

      // handle terms agree
      if (termsAgreedStorage === "1") {
        setTermsAgreed(true);
      }

      const appVersion = Constants.nativeAppVersion || "0";
      if (appVersion < config.app.version.minimum) {
        setAppOutdated(true);
      }

      setInitialDataLoaded(true);
    } catch (err) {
      setIsInitialDataError(true);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  if (fontsLoaded && interFontLoaded) {
    if (initialDataLoaded && appOutdated) {
      return <AppOutdatedScreen />;
    }

    if (initialDataLoaded) {
      return <Routes terms={{ agreed: termsAgreed, message: termsMessage }} />;
    }

    if (isInitialDataError) {
      return <ErrorScreen onPress={Restart} />;
    }
  }

  return null;
};

export default AppWrapper;
