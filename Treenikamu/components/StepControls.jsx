import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import componentStyles from "../styles/componentStyles";

const StepControls = ({ onBack, onSave }) => {
  return (
    <View style={componentStyles.buttonWrapper}>
      <TouchableOpacity
        onPress={onBack}
        style={[componentStyles.buttonContainer, componentStyles.defaultButton]}
      >
        <Text style={componentStyles.buttonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSave}
        style={[componentStyles.buttonContainer, componentStyles.dangerButton]}
      >
        <Text style={componentStyles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepControls;
