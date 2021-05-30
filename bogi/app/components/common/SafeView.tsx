import * as React from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

const SafeView: React.FC = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? statusBarHeight : 0,
  },
});

export default SafeView;
