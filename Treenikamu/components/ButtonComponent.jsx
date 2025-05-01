import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../styles/componentStyles";

export default function ButtonComponent({
  content,
  type = "default",
  onPress,
  button,
  ...props
}) {
  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return componentStyles.dangerButton;
      case "prev":
        return componentStyles.prevButton;
      case "next":
        return componentStyles.nextButton;
      case "save":
        return componentStyles.saveButton;
      default:
        return componentStyles.defaultButton;
    }
  };

  if (button === "float") {
    return (
    <TouchableOpacity
      style={[componentStyles.floatingButton, getButtonStyle()]}
      onPress={onPress}
      {...props}
    >
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>

    );
  }

  return (
    <TouchableOpacity
      style={[componentStyles.buttonContainer, getButtonStyle()]}
      onPress={onPress}
      {...props}
    >
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}
