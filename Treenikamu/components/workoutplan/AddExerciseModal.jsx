import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import componentStyles from '../../styles/componentStyles';
import textStyles from '../../styles/textStyles';
import TextThemed from '../TextThemed';
import SelectButton from '../SelectButton';

const AddExerciseModal = ({ visible, onClose, availableExercises, onAdd }) => {
  return (
    <Modal visible={visible} transparent  animationType="slide">
      <View style={componentStyles.addExerciseModal}>
        <View style={componentStyles.addExerciseModalContainer}>
          <TextThemed style={textStyles.titleLargeBDark}>Lisää liike</TextThemed>
          <ScrollView style={componentStyles.addExerciseModalList}>
            {availableExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => onAdd(exercise)}
                style={componentStyles.listItem}
              >
                <Text>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <SelectButton onPress={onClose} type='icon' iconName='close-circle' iconSize={40}  iconType='danger' />
          
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;
