import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CreatePlanForm from '../components/CreatePlanForm';

const WorkoutPlanView = () => {
  const [hasProgram, setHasProgram] = useState(false);

  return (
    <View>
      {hasProgram ? (
        <Text>Your program will go here...</Text>
      ) : (
        <View>
          <Text style={{ fontSize: 24 }}>Create your training program</Text>
          <Button title="Create" onPress={() => setHasProgram(true)} />
        </View>
      )}

      {hasProgram && <CreatePlanForm />}
    </View>
  );
};

export default WorkoutPlanView;
