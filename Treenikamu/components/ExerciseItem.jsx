import React from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import TextThemed from "./TextThemed";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";

const ExerciseItem = ({ exercise, onPress, onLongPress, onDelete }) => {
  if (!exercise) return null;

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={onDelete}
        style={{
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          width: 64,
          borderRadius: 16,
          marginVertical: 16,
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <MaterialIcons name="delete" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        <View style={componentStyles.itemCardmd}>
          <Image
            source={{ uri: exercise.imgurl }}
            style={{ width: 72, height: 56, marginRight: 12, borderRadius: 8 }}
          />
          <View>
            <TextThemed style={textStyles.bodyLargeB}>{exercise.name}</TextThemed>
            <TextThemed style={textStyles.bodySmall}>
              {exercise.reps} x {exercise.sets}{" "}
              {exercise.weight ? `- ${exercise.weight}kg` : ""}
            </TextThemed>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ExerciseItem;
