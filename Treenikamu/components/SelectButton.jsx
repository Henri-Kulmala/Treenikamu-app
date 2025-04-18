import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../styles/componentStyles";


export default function SelectButton({ content, type = "disabled", onPress, ...props }) {
 
  const getButtonStyle = () => {
    switch (type) {
      case "disabled":
        return componentStyles.buttonSelectDisabled;
      case "enabled":
        return componentStyles.buttonSelectEnabled;
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} {...props}>
      <Text style={componentStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}


