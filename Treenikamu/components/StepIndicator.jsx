import React from 'react';
import { View, StyleSheet } from 'react-native';

const StepIndicator = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={[
            styles.dot,
            currentStep === step ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: '#3478f6', 
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});

export default StepIndicator;
