import React from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import TextThemed from "../TextThemed";
import componentStyles from "../../styles/componentStyles";
import MainTheme from "../../styles/mainTheme";
import textStyles from "../../styles/textStyles";

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
          backgroundColor: MainTheme.colors.danger,
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
            style={{
              width: 100,
              height: "auto",
              aspectRatio: 1,
              marginRight: 12,
              borderRadius: 16,
            }}
          />
          <View style={componentStyles.itemCardText}>
            <TextThemed style={textStyles.titleSmall}>
              {exercise.name}
            </TextThemed>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <TextThemed style={textStyles.bodySmallBCaps}>
                {exercise.reps} x {exercise.sets}{" "}
              </TextThemed>
              <TextThemed style={textStyles.bodySmallBCaps}>
                {exercise.weight ? `${exercise.weight}kg` : ""}
              </TextThemed>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ExerciseItem;
