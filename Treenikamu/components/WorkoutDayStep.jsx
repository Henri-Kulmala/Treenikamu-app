import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import componentStyles from '../styles/componentStyles';
import textStyles from '../styles/textStyles';
import TextThemed from '../components/TextThemed';
import ButtonComponent from '../components/ButtonComponent';


const days = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

const WorkoutDayStep = ({ selectedDays, onChangeDays, onNext }) => {
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {days.map(day => (
          <ButtonComponent
            key={day}
            onPress={() => toggleDay(day)}
            type={selectedDays.includes(day) ? 'danger' : 'default'}

            content={day}
          >
           
          </ButtonComponent>
        ))}
      </View>
      <ButtonComponent content="Seuraava" disabled={selectedDays.length === 0} onPress={onNext} />
    </View>
  );
};

export default WorkoutDayStep;
