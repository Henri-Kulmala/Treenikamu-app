import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../styles/componentStyles";


export default function ButtonComponent({ content, type = "default", onPress, ...props }) {
 
  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return componentStyles.dangerButton;
      case "prev":
        return componentStyles.prevButton;
      case "next":
        return componentStyles.nextButton;
      default:
        return componentStyles.defaultButton;
    }
  };

  return (
    <TouchableOpacity style={[componentStyles.buttonContainer, getButtonStyle()]} onPress={onPress} {...props}>
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}


