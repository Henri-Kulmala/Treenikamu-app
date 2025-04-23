// File: components/workoutplan/WorkoutPlan.jsx
import React from 'react';
import { View, Text } from 'react-native';
import WorkoutDaySection from './WorkoutDaySection';
import TextThemed from '../TextThemed';
import textStyles from '../../styles/textStyles';

export default function WorkoutPlan({ days = {}, exerciseData = {}, onEditExercise, onUpdateExercises }) {
  return (
    <>
      {Object.entries(days).map(([dayName, exercises]) => (
        <View key={dayName} style={{ marginBottom: 24 }}>
          <TextThemed style={textStyles.titleLargeB}>{dayName}</TextThemed>
          <WorkoutDaySection
            dayName={dayName}
            exercises={exercises}
            exerciseData={exerciseData}
            onEditExercise={(ex) => onEditExercise(ex, dayName)}
            setExercises={(updater) => onUpdateExercises(dayName, updater)}
          />
        </View>
      ))}
    </>
  );
}