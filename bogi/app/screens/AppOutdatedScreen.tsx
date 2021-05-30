import React from "react";
import * as Linking from "expo-linking";
import { View } from "react-native";
import SafeView from "../components/common/SafeView";
import SomeError from "../components/common/SomeError";
import { useAppSelector } from "../store/hooks";
import { getAppConfig } from "../store/config";

interface AppOutdatedScreenProps {}

const AppOutdatedScreen: React.FC<AppOutdatedScreenProps> = () => {
  const appConfig = useAppSelector(getAppConfig);

  return (
    <SafeView>
      <View style={{ marginTop: 100 }}>
        <SomeError
          buttonText="আপডেট করুন"
          errorMessage="এ্যাপটি আপডেট করতে হবে!"
          showButton
          onPress={() => {
            Linking.openURL(appConfig.appLink);
          }}
        />
      </View>
    </SafeView>
  );
};

export default AppOutdatedScreen;
