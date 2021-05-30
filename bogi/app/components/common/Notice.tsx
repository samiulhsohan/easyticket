import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../../styles/colors";
import globalStyles from "../../styles/global";

type NoticeTypes = keyof typeof colors.BACKGROUND;

export interface NoticeProps {
  type?: NoticeTypes;
  title: string;
  message?: string;
}

const Notice: React.FC<NoticeProps> = ({ title, message, type = "INFO" }) => (
  <View
    style={[styles.container, { backgroundColor: colors.BACKGROUND[type] }]}
  >
    <View>
      <MaterialIcons name="info" size={24} color={colors.CONTENT[type]} />
    </View>

    <View style={styles.content}>
      <Text
        style={[
          globalStyles.text,
          styles.title,
          { color: colors.CONTENT[type] },
        ]}
      >
        {title}
      </Text>
      {message && (
        <Text
          style={[
            globalStyles.text,
            styles.message,
            { color: colors.CONTENT[type] },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND.WARNING,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
  },
  content: {
    marginLeft: 8,
    flex: 1,
  },
  title: {
    fontSize: 22,
  },
  message: {
    fontSize: 18,
    marginTop: 4,
  },
});

export default Notice;
