import React from 'react';
import { View, Text} from 'react-native';
import ButtonComponent from './ButtonComponent';
import textStyles from '../styles/textStyles';
import componentStyles from '../styles/componentStyles';
import TextThemed from './TextThemed';


const splits = [
  { id: 1, name: 'Bro split' },
  { id: 2, name: 'Push, Pull, Legs' },
  { id: 3, name: 'Koko kroppa' }
];

const WorkoutSplitStep = ({ selectedSplit, onSelectSplit, onNext }) => (
  <View style={componentStyles.childContainer}>
    <TextThemed style={textStyles.titleLarge}>Valitse treeniohjelma valmiista malleista</TextThemed>
    {splits.map((split) => (
      <ButtonComponent
        key={split.id}
        content={split.name}
        onPress={() => onSelectSplit(split.id)}
        type={selectedSplit === split.id ? 'danger' : 'default'}
      />
    ))}
    <ButtonComponent content="Seuraava" disabled={!selectedSplit} onPress={onNext} />
  </View>
);

export default WorkoutSplitStep;
