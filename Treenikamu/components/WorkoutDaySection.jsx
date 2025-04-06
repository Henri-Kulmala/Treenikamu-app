import React from "react";
import { View, Text } from "react-native";
import GroupedExerciseSection from "./GroupedExerciseSection";

const WorkoutDaySection = ({
  dayName,
  exercises = [],
  onEditExercise,
  setExercises,
  exerciseData,
}) => {
  const groups = {};

  // ✅ Dev-time safety check
  if (!Array.isArray(exercises)) {
    console.warn(
      `WorkoutDaySection: 'exercises' for ${dayName} is not an array`,
      exercises
    );
    exercises = [];
  }

  exercises.forEach((ex) => {
    const key = ex.id?.split("-")[0]; // Defensive access in case id is missing
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
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        {dayName}
      </Text>
      {Object.entries(groups).map(([groupName, groupExercises]) => (
        <GroupedExerciseSection
          key={groupName}
          title={groupName}
          muscleGroup={groupName}
          currentExercises={groupExercises}
          allExercises={exerciseData}
          onEditExercise={onEditExercise}
          onAddExercise={handleAddExercise}
          onReorder={(data) => handleReorder(groupName, data)}
        />
      ))}
    </View>
  );
};

export default WorkoutDaySection;
