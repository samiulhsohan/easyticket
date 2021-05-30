import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { convertToBengaliNumber } from "../../../utils/common";
import colors from "../../../styles/colors";
import globalStyles from "../../../styles/global";

export interface PassengerSelectorProps {
  label: string;
  description: string;
  max: number;
  min: number;
  count: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = (props) => {
  const {
    label,
    description,
    count,
    min,
    max,
    handleDecrease,
    handleIncrease,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[globalStyles.text, styles.labelText]}>{label}</Text>
        <Text style={[globalStyles.text, styles.lablDescription]}>
          {description}
        </Text>
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={handleDecrease} disabled={count <= min}>
          <View style={styles.selectorIcon}>
            <MaterialIcons name="remove" size={18} />
          </View>
        </TouchableOpacity>

        <View style={styles.count}>
          <Text style={[styles.countText, globalStyles.text]}>
            {convertToBengaliNumber(count.toString())}
          </Text>
        </View>

        <TouchableOpacity onPress={handleIncrease} disabled={count >= max}>
          <View style={styles.selectorIcon}>
            <MaterialIcons name="add" size={18} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  labelContainer: {},
  labelText: {
    fontSize: 24,
    color: colors.CONTENT.PRIMARY,
  },
  lablDescription: {
    fontSize: 18,
    color: colors.CONTENT.TERTIARY,
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectorIcon: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.BORDER.OPAQUE,
    height: 40,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    width: 50,
  },
  countText: {
    width: 50,
    textAlign: "center",
    fontSize: 26,
  },
});

export default PassengerSelector;
