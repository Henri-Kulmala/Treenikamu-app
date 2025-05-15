import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../styles/componentStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainTheme from "../styles/mainTheme";

export default function SelectButton({
  content,
  type = "disabled",
  onPress,
  iconName,
  iconSize,
  iconStyle,
  iconType,
  iconColor,
  ...props
}) {
  const getButtonStyle = () => {
    switch (type) {
      case "disabled":
        return componentStyles.buttonSelectDisabled;
      case "enabled":
        return componentStyles.buttonSelectEnabled;
      case "icon":
        return componentStyles.iconButtonContainer;
    }
  };

  const getIconType = () => {
    switch (iconType) {
      case "disabled":
        return MainTheme.colors.highlightGreenMuted;
      case "danger":
        return MainTheme.colors.danger;
      case "danger-disabled":
        return MainTheme.colors.danger60;
      case "null":
        return "#00000000"
      case "custom":
        return iconColor;
      default:
        return MainTheme.colors.highlightGreen;
    }
  }

  if (type === "icon") {
    return (
      <TouchableOpacity style={getButtonStyle()} onPress={onPress} {...props}>
        <Ionicons
          size={iconSize}
          name={iconName}
          style={iconStyle}
          color={getIconType()}
        />
      </TouchableOpacity>
    );
  }
  if (iconType === "null") {
    return;
  }

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} {...props}>
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}
