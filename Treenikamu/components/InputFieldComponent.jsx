import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import MainTheme from "../styles/mainTheme";

export default function InputFieldComponent({
  placeholder,
  styleType,
  value,
  onChangeText,
  header,
  inputStyle,
  step = 1,
  min = 0,
  max = Infinity,
  ...props
}) {
  const getInputType = () => {
    switch (styleType) {
      case "dark":
        return textStyles.inputHeaderDark;
      default:
        return textStyles.inputHeader;
    }
  };

  const handleDecrease = () => {
    const current = Number(value) || 0;
    if (current - step >= min) {
      onChangeText(String(current - step));
    }
  };

  const handleIncrease = () => {
    const current = Number(value) || 0;
    if (current + step <= max) {
      onChangeText(String(current + step));
    }
  };

  if (inputStyle === "number") {
    return (
      <View >
        <Text style={[textStyles.inputHeader, getInputType()]}>{header}</Text>
        <View style={componentStyles.numberPickerContainer}>
          <TouchableOpacity onPress={handleDecrease} style={componentStyles.iconButtonDanger}>
            <AntDesign name="minus" size={16} color={MainTheme.colors.text} />
          </TouchableOpacity>
          <TextInput
            style={componentStyles.inputField}
            value={String(value)}
            keyboardType="numeric"
            editable={false}
            {...props}
          />
          <TouchableOpacity onPress={handleIncrease} style={componentStyles.iconButtonSuccess}>
            <AntDesign name="plus" size={16} color={MainTheme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={componentStyles.inputFieldContainer}>
      <Text style={[textStyles.inputHeader, getInputType()]}>{header}</Text>
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
