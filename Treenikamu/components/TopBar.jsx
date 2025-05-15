import { View, Text } from "react-native";
import React from "react";
import ThemedText from "./TextThemed";
import MainTheme from "../styles/mainTheme";
import textStyles from "../styles/textStyles";
import componentStyles from "../styles/componentStyles";
import SelectButton from "./SelectButton";

export default function TopBar({ title = "teksti", leftIconName = "calendar", leftIconPress, rightIconName="options", rightIconPress }) {
  return (
    <View style={componentStyles.topBarContainer}>
      <SelectButton type="icon" iconName={leftIconName} iconSize={32} onPress={leftIconPress}  />
      <ThemedText style={textStyles.titleSmallBCaps}>{title}</ThemedText>
      <SelectButton type="icon" iconName={rightIconName} iconSize={32} onPress={rightIconPress} />
    </View>
  );
}
