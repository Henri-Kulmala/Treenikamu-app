import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';

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
      <Text>Choose workout days:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {days.map(day => (
          <Pressable
            key={day}
            onPress={() => toggleDay(day)}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: selectedDays.includes(day) ? 'green' : 'gray'
            }}
          >
            <Text>{day}</Text>
          </Pressable>
        ))}
      </View>
      <Button title="Next" disabled={selectedDays.length === 0} onPress={onNext} />
    </View>
  );
};

export default WorkoutDayStep;
