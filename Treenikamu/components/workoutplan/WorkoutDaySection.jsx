import React from "react";
import { View, Text } from "react-native";
import GroupedExerciseSection from "./GroupedExerciseSection";
import TextThemed from "../TextThemed";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";

const WorkoutDaySection = ({
  dayName,
  exercises = [],
  onEditExercise,
  setExercises,
  exerciseData,
}) => {
  const groups = {};


  if (!Array.isArray(exercises)) {
    console.warn(
      `WorkoutDaySection: 'exercises' for ${dayName} is not an array`,
      exercises
    );
    exercises = [];
  }

  exercises.forEach((ex) => {
    const key = ex.id?.split("-")[0]; 
    if (!key) return;
    if (!groups[key]) groups[key] = [];
    groups[key].push(ex);
  });

  const handleAddExercise = (newEx) => {
    setExercises((prev) => (Array.isArray(prev) ? [...prev, newEx] : [newEx]));
  };

  const handleReorder = (groupKey, reorderedList) => {
    setExercises((prev) => {
      const others = prev.filter((ex) => ex.id.split("-")[0] !== groupKey);
      return [...others, ...reorderedList];
    });
  };

  return (
    <View style={componentStyles.workoutDaySectionContainer}>
      <View View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <TextThemed style={textStyles.titleLarge}>{dayName}</TextThemed>
      </View>
      
      {Object.entries(groups).map(([groupName, groupExercises]) => (
        <GroupedExerciseSection
          key={groupName}
          title={groupName}
          muscleGroup={groupName}
          currentExercises={groupExercises}
          allExercises={exerciseData}
          onEditExercise={(exercise) =>
            onEditExercise({ ...exercise, dayName })
          }
          onAddExercise={handleAddExercise}
          onReorder={(data) => handleReorder(groupName, data)}
        />
      ))}
    </View>
    
  );
};

export default WorkoutDaySection;
