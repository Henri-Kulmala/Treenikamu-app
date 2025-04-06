import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import TextThemed from "./TextThemed";
import textStyles from "../styles/textStyles";

export default function InstructionsFrame({ content, header, type }) {

    const getHeaderStyle = () => {
        switch (type) {
            case "light":
                return textStyles.titleSmallB;
            default:
                return textStyles.titleSmallBDark;
        }
    };
    const getContentStyle = () => {
        switch (type) {
            case "light":
                return textStyles.bodySmall;
            default:
                return textStyles.bodySmallDark;
        }
    }

  return (
    <View style={styles.container}>
      <TextThemed style={getHeaderStyle()}>{header}</TextThemed>
      <TextThemed style={getContentStyle()}>{content}</TextThemed>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
 
});


