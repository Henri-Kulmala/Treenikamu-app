import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import componentStyles from "../styles/componentStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainTheme from "../styles/mainTheme";
import textStyles from "../styles/textStyles";

const StepControls = ({
  onBack,
  onNext,
  nextContent,
  prevContent,
  nextStyle,
  prevStyle,
}) => {
  return (
    <View style={componentStyles.stepContainer}>
      <TouchableOpacity onPress={onBack}>
      <Ionicons  size={40} name="chevron-back-circle" style={componentStyles.iconButtonStep} color={MainTheme.colors.highlightGreenMuted}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext}>
        <Ionicons size={40} name="chevron-forward-circle" style={componentStyles.iconButtonStep} color={MainTheme.colors.highlightGreen}/>
      </TouchableOpacity>
    </View>
  );
};

export default StepControls;
