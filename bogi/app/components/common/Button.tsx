import React from "react";
import { TouchableNativeFeedback, View, StyleSheet, Text } from "react-native";
import colors from "../../styles/colors";
import globalStyles from "../../styles/global";

interface ButtonProps {
  variant?: "default" | "large";
  onPress?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  onPress,
  children,
  disabled = false,
}) => {
  return (
    <View>
      {variant === "large" && (
        <TouchableNativeFeedback
          style={{ borderRadius: 8 }}
          onPress={onPress}
          disabled={disabled}
        >
          <View style={[styles.large, disabled ? styles.disabled : null]}>
            <Text
              style={[
                globalStyles.text,
                styles.largeText,
                disabled ? styles.disabledText : null,
              ]}
            >
              {children}
            </Text>
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  large: {
    backgroundColor: colors.ACCENT,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  largeText: {
    fontSize: 24,
    color: "#FFF",
  },
  disabled: {
    backgroundColor: colors.BACKGROUND.DISABLED,
  },
  disabledText: {
    color: colors.CONTENT.DISABLED,
  },
});

export default Button;
