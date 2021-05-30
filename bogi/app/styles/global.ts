import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
  text: {
    fontFamily: "Noirrit",
    color: colors.CONTENT.PRIMARY,
  },
  screenTitle: {
    fontFamily: "Noirrit",
    textAlign: "center",
    fontSize: 35,
  },
});

export default globalStyles;
