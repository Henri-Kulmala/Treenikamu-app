import React from "react";
import { View } from "react-native";
import WorkoutPlanWrapper from "../components/workoutplan/WorkoutPlanWrapper";
import componentStyles    from "../styles/componentStyles";

export default function WorkoutPlanView() {
  return (
    <View style={componentStyles.mainContainer}>
      <WorkoutPlanWrapper />
    </View>
  );
}
