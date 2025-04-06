import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const AddExerciseModal = ({ visible, onClose, availableExercises, onAdd }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#fff', margin: 20, borderRadius: 12, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Lisää liike</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {availableExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => onAdd(exercise)}
                style={{
                  padding: 10,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8
                }}
              >
                <Text>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 12 }}>
            <Text style={{ textAlign: 'center', color: 'red' }}>Sulje</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;
