import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../constants/componentStyles";

export default function ButtonComponent({ content, type = "default", onPress }) {
 
  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return componentStyles.dangerButton;
      default:
        return componentStyles.defaultButton;
    }
  };

  return (
    <TouchableOpacity style={[componentStyles.buttonContainer, getButtonStyle()]} onPress={onPress}>
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}


