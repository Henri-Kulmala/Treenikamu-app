import React from 'react';
import { View, Text} from 'react-native';
import ButtonComponent from './ButtonComponent';

const splits = [
  { id: 1, name: 'Back & Biceps, Chest & Triceps, Legs' },
  { id: 2, name: 'Push, Pull, Legs' },
  { id: 3, name: 'Full body' }
];

const WorkoutSplitStep = ({ selectedSplit, onSelectSplit, onNext }) => (
  <View>
    <Text style={{ fontSize: 20 }}>Choose your workout split:</Text>
    {splits.map((split) => (
      <ButtonComponent
        key={split.id}
        content={split.name}
        onPress={() => onSelectSplit(split.id)}
        color={selectedSplit === split.id ? 'green' : 'gray'}
      />
    ))}
    <ButtonComponent content="Next" disabled={!selectedSplit} onPress={onNext} />
  </View>
);

export default WorkoutSplitStep;
