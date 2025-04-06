import React from 'react';
import { View, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ExerciseItem from './ExerciseItem';
import AddExerciseModal from './AddExerciseModal';

const GroupedExerciseSection = ({
  title,
  muscleGroup,
  currentExercises,
  allExercises,
  onEditExercise,
  onAddExercise,
  onReorder
}) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  const usedIds = currentExercises.map(ex => ex.id);
  const addableExercises = Object.entries(allExercises[muscleGroup] || {})
    .filter(([key]) => !usedIds.some(id => id.includes(key)))
    .map(([key, data]) => ({
      ...data,
      id: `${muscleGroup}-${key}-${Math.random()}`,
      reps: 10,
      sets: 3,
      weight: 0,
    }));

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>

      <DraggableFlatList
        data={currentExercises}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          onReorder(data);
        }}
        renderItem={({ item, drag }) => (
          <ExerciseItem
            exercise={item}
            onPress={() => onEditExercise({ ...item })}
            onLongPress={drag}
          />
        )}
      />

      <Text onPress={() => setShowAddModal(true)} style={{ color: 'blue', marginTop: 8 }}>
        + Lisää liike
      </Text>

      <AddExerciseModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        availableExercises={addableExercises}
        onAdd={(exercise) => {
          onAddExercise(exercise);
          setShowAddModal(false);
        }}
      />
    </View>
  );
};

export default GroupedExerciseSection;
