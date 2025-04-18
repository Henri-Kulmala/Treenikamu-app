import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import componentStyles from "../styles/componentStyles";
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
      <TouchableOpacity onPress={onBack} style={componentStyles.prevButton}>
        <Text style={textStyles.buttonText}>{prevContent}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext} style={componentStyles.nextButton}>
        <Text style={textStyles.buttonTextMuted}>{nextContent}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepControls;
