import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../../styles/colors";
import globalStyles from "../../styles/global";
import NothingFoundIcon from "../icons/NothingFoundIcon";

interface NothingFoundProps {
  showButton?: boolean;
  buttonText?: string;
  onPress?: () => void;
}

const NothingFound: React.FC<NothingFoundProps> = ({
  showButton = false,
  buttonText = "বাটন",
  onPress,
}) => {
  return (
    <View>
      <NothingFoundIcon height={150} />
      <Text style={[globalStyles.text, styles.title]}>
        কিছুই খুঁজে পাওয়া যায়নি
      </Text>

      {showButton && (
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <TouchableHighlight style={{ borderRadius: 8 }} onPress={onPress}>
            <View style={styles.button}>
              <Text
                style={[globalStyles.text, { color: "#FFF", fontSize: 20 }]}
              >
                {buttonText}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 16,
    color: colors.CONTENT.PRIMARY,
  },
  button: {
    backgroundColor: colors.ACCENT,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default NothingFound;
