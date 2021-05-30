import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import SafeView from "../components/common/SafeView";
import colors from "../styles/colors";
import globalStyles from "../styles/global";
import { TicketingStackNavProps } from "../TicketingStackParamList";

const TermsScreen: React.FC<TicketingStackNavProps<"Terms">> = ({
  navigation,
  route,
}) => {
  const handleTermsAccept = async () => {
    await AsyncStorage.setItem("@termsAgreed", "1");
    navigation.navigate("Home");
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={{ fontSize: 40, textAlign: "center", marginBottom: 30 }}>
            👋 🚉 🚦
          </Text>
          <Text style={[globalStyles.text, { fontSize: 24 }]}>
            {route.params.message}
          </Text>
        </View>

        <View style={{ bottom: 80 }}>
          <TouchableHighlight
            style={{ borderRadius: 8 }}
            onPress={handleTermsAccept}
          >
            <View style={styles.buttonContainer}>
              <Text
                style={[globalStyles.text, { fontSize: 26, color: "#FFF" }]}
              >
                বুঝতে পেরেছি
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  info: {
    marginBottom: 30,
    marginTop: 100,
  },
  buttonContainer: {
    backgroundColor: colors.ACCENT,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

export default TermsScreen;
