import { View, Text, TextInput } from "react-native";
import React from "react";
import componentStyles from "../constants/componentStyles";

export default function InputFieldComponent({ placeholder, value, onChangeText, header, ...props }) {
  return (
    <View style={componentStyles.inputFieldContainer}>
      <Text style={componentStyles.inputHeader}>{header}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={componentStyles.inputField}
        {...props}
      />
    </View>
  );
}
