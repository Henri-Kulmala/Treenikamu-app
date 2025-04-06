import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ExerciseItem = ({ exercise, onPress, onLongPress }) => {
  if (!exercise) return null;

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={{
        flexDirection: 'row',
        height: 64,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        alignItems: 'center'
      }}>
        <Image
          source={{ uri: exercise.imgurl }}
          style={{ width: 64, height: 48, marginRight: 12 }}
        />
        <View>
          <Text>{exercise.name}</Text>
          <Text>{exercise.reps} x {exercise.sets} {exercise.weight ? `- ${exercise.weight}kg` : ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseItem;
