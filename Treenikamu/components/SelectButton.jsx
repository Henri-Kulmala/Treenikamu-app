import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../styles/componentStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SelectButton({
  content,
  type = "disabled",
  onPress,
  iconName,
  iconSize,
  iconStyle,
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

  if (type === "icon") {
    return (
      <TouchableOpacity style={getButtonStyle()} onPress={onPress} {...props}>
        <Ionicons
          size={iconSize}
          name={iconName}
          style={iconStyle}
          color={iconColor}
        />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} {...props}>
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}
