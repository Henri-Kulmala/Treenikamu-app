import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import MainTheme from "../styles/mainTheme";
import TextThemed from "./TextThemed";

export default function InputFieldComponent({
  isError = "false",
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
        return textStyles.inputLabelDark;
      default:
        return textStyles.inputLabel;
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
        <TextThemed style={[textStyles.inputLabel, getInputType()]}>{header}</TextThemed>
        <View style={componentStyles.numberPickerContainer}>
          <TouchableOpacity onPress={handleDecrease} style={componentStyles.iconButtonDanger}>
            <AntDesign name="minus" size={16} color={MainTheme.colors.text} />
          </TouchableOpacity>
          <TextInput
            style={[componentStyles.inputFieldNumber, textStyles.titleSmallB] }
            value={String(value)}
            keyboardType="numeric"
            editable={true}
            onChangeText={onChangeText}
            {...props}
          />
          
          <TouchableOpacity onPress={handleIncrease} style={componentStyles.iconButtonSuccess}>
            <AntDesign name="plus" size={16} color={MainTheme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isError === "true") {


  return (
    <View style={componentStyles.inputFieldContainer}>
      <TextThemed style={[textStyles.inputLabelError]}>{header}</TextThemed>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={componentStyles.inputError}
        {...props}
      />
    </View>
  );

}

return (
  <View style={componentStyles.inputFieldContainer}>
    <TextThemed style={[textStyles.inputLabel, getInputType()]}>{header}</TextThemed>
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
