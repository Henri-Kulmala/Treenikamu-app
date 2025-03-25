import { View, Text } from "react-native";
import React from "react";
import componentStyles from "../constants/componentStyles";

export default function ButtonComponent({}) {
  return (
    <View>
      <TouchableOpacity style={componentStyles.buttonContainer} >
        <Text style={componentStyles.button}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}
