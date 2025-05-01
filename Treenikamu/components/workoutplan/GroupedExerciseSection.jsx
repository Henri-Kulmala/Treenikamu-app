import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ExerciseItem from "./ExerciseItem";
import AddExerciseModal from "./AddExerciseModal";
import { MaterialIcons } from "@expo/vector-icons";
import MainTheme from "../../styles/mainTheme";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import { ScrollView } from "react-native-gesture-handler";
import componentStyles from "../../styles/componentStyles";

const GroupedExerciseSection = ({
  title,
  muscleGroup,
  currentExercises,
  allExercises,
  onEditExercise,
  onAddExercise,
  onReorder,
}) => {
  const [showAddModal, setShowAddModal] = React.useState(false);

  const usedIds = currentExercises.map((ex) => ex.id);
  const addableExercises = Object.entries(allExercises[muscleGroup] || {})
    .filter(([key]) => !usedIds.some((id) => id.includes(key)))
    .map(([key, data]) => ({
      ...data,
      id: `${muscleGroup}-${key}-${Math.random()}`,
      reps: 10,
      sets: 3,
      weight: 0,
    }));

  return (
    <View style={componentStyles.exerciseListContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: 8,
          width: "100%",
        }}
      >
        <TextThemed style={textStyles.titleSmallBCaps}>{title}</TextThemed>
      </View>

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
            onDelete={() =>
              onReorder(currentExercises.filter((e) => e.id !== item.id))
            }
          />
        )}
      />

      <TouchableOpacity
        onPress={() => setShowAddModal(true)}
        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      >
        <MaterialIcons
          name="add-circle"
          size={20}
          color={MainTheme.colors.highlightGreen}
        />
      </TouchableOpacity>

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
