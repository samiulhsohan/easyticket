import React from "react";
import { View } from "react-native";
import SafeView from "../components/common/SafeView";
import SomeError from "../components/common/SomeError";

interface ErrorScreenProps {
  buttonText?: string;
  onPress?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  onPress,
  buttonText = "আবার চেষ্টা করুন",
}) => {
  return (
    <SafeView>
      <View style={{ marginTop: 100 }}>
        <SomeError buttonText={buttonText} showButton onPress={onPress} />
      </View>
    </SafeView>
  );
};

export default ErrorScreen;
