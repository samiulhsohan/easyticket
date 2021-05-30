import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import globalStyles from "../../styles/global";

export interface TitleBarProps {
  type?: "close" | "back";
  barStyle?: "default" | "dark-content" | "light-content";
  statusBarBackground?: string;
  onPress: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({
  children,
  onPress,
  type = "close",
  statusBarBackground = "#FFF",
  barStyle = "dark-content",
}) => {
  return (
    <View style={styles.titleBar}>
      <StatusBar backgroundColor={statusBarBackground} barStyle={barStyle} />

      <MaterialIcons
        name={type === "close" ? "close" : "arrow-back"}
        style={{ padding: 4 }}
        size={24}
        color={colors.CONTENT.TERTIARY}
        onPress={onPress}
      />

      <Text style={[globalStyles.text, styles.titleBarText]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.BORDER.OPAQUE,
    borderBottomWidth: 1,
  },
  titleBarText: {
    color: colors.CONTENT.PRIMARY,
    fontSize: 24,
    marginLeft: 24,
  },
});

export default TitleBar;
