import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import componentStyles from '../../styles/componentStyles';
import textStyles from '../../styles/textStyles';
import TextThemed from '../TextThemed';
import ButtonComponent from '../ButtonComponent';
import SelectButton from '../SelectButton';


const days = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

const WorkoutDayStep = ({ selectedDays, onChangeDays }) => {
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onChangeDays(selectedDays.filter(d => d !== day));
    } else {
      onChangeDays([...selectedDays, day]);
    }
  };

  return (
    <View>
      <TextThemed style={textStyles.titleLarge}>Valitse treenipäivät</TextThemed>
      <View style={componentStyles.workoutDayStepContainer}>
        {days.map(day => (
          <SelectButton    
            key={day}
            onPress={() => toggleDay(day)}
            type={selectedDays.includes(day) ? 'enabled' : 'disabled'}
            content={day}
          >
           
          </SelectButton>
        ))}
      </View>
    </View>
  );
};

export default WorkoutDayStep;
