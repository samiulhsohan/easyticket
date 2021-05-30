import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../../styles/colors";
import globalStyles from "../../../styles/global";
import { convertToBengaliNumber } from "../../../utils/common";

interface TrainCabinSelectCardProps {
  cabinName: string;
  availableSeats: string;
  fare: string;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

const { width } = Dimensions.get("screen");
const screenHorizontalPadding = 16;
const cabinCardMargin = 12;

const TrainCabinSelectCard: React.FC<TrainCabinSelectCardProps> = ({
  cabinName,
  availableSeats,
  fare,
  onPress,
  disabled = false,
  selected = false,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          style.singleCabinCard,
          selected ? style.selectedCard : null,
          disabled ? style.disabledCard : null,
        ]}
      >
        <Text
          style={[
            style.cabinName,
            selected ? style.selectedCardText : null,
            disabled ? style.disabledCardText : null,
          ]}
        >
          {cabinName}
        </Text>
        <Text
          style={[
            style.availableSeatsText,
            selected ? style.selectedCardText : null,
            disabled ? style.disabledCardText : null,
          ]}
        >
          {availableSeats === "0"
            ? "সিট খালি নাই"
            : `সিট খালি ${convertToBengaliNumber(availableSeats)} টি`}
        </Text>
        <Text
          style={[
            style.fare,
            selected ? style.selectedCardText : null,
            disabled ? style.disabledCardText : null,
          ]}
        >
          ৳{convertToBengaliNumber(fare)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  disabledCard: {
    backgroundColor: colors.BACKGROUND.DISABLED,
    borderColor: colors.BACKGROUND.DISABLED,
  },
  disabledCardText: {
    color: colors.CONTENT.DISABLED,
  },
  selectedCard: {
    backgroundColor: colors.ACCENT,
    borderColor: colors.ACCENT,
  },
  selectedCardText: {
    color: "#FFF",
  },
  singleCabinCard: {
    borderColor: colors.BORDER.TRANSPARENT,
    borderWidth: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: cabinCardMargin,
    borderRadius: 8,
    width: (width - screenHorizontalPadding * 2 - cabinCardMargin) / 2,
  },
  cabinName: {
    ...globalStyles.text,
    color: colors.PRIMARY_A,
    fontSize: 22,
  },
  fare: {
    ...globalStyles.text,
    color: colors.CONTENT.PRIMARY,
    fontSize: 22,
    marginTop: 6,
  },
  availableSeatsText: {
    ...globalStyles.text,
    fontSize: 18,
    color: colors.CONTENT.TERTIARY,
    marginTop: 2,
  },
});

export default TrainCabinSelectCard;
