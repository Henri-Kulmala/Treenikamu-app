import React from "react";
import { View, Text } from "react-native";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";
import TextThemed from "../TextThemed";
import SplitItem from "../SplitItem";

const splits = [
  {
    id: 1,
    name: "Kolmiosainen",
    description: "Selkä ja hauis, Rinta ja ojentajat sekä jalat & olkapäät",
  },
  {
    id: 2,
    name: "Push, Pull, Legs",
    description: " Työntävät, Vetävät ja sitten jalat",
  },
  {
    id: 3,
    name: "Koko kroppa",
    description: "Joka treenin aikana koko kropan treenit kerralla",
  },
];

const WorkoutSplitStep = ({ selectedSplit, onSelectSplit}) => (
  <View style={componentStyles.childContainer}>
    <TextThemed style={textStyles.titleLarge}>
      Valitse treeniohjelma valmiista malleista
    </TextThemed>
    {splits.map((split) => (
      <SplitItem
        key={split.id}
        name={split.name}
        description={split.description}
        onPress={() => onSelectSplit(split.id)}
        type={selectedSplit === split.id ? "open" : "default"}
      />
    ))}
  </View>
);

export default WorkoutSplitStep;
