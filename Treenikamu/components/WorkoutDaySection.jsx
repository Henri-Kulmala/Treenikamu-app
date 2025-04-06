import React from 'react';
import { Text, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ExerciseItem from './ExerciseItem';

const WorkoutDaySection = ({ dayName, exercises, onEditExercise, setExercises }) => {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{dayName}</Text>
      <DraggableFlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setExercises(data)}
        renderItem={({ item, drag }) => (
          <ExerciseItem
            exercise={item}
            onPress={() => onEditExercise({ ...item, dayName })}
            onLongPress={drag}
          />
        )}
      />
    </View>
  );
};

export default WorkoutDaySection;
