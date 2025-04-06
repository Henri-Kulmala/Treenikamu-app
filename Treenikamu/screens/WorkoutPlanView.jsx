import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CreatePlanForm from '../components/CreatePlanForm';
import componentStyles from '../styles/componentStyles';
import textStyles from '../styles/textStyles';
import TextThemed from '../components/TextThemed';
import ButtonComponent from '../components/ButtonComponent';

const WorkoutPlanView = () => {
  const [hasProgram, setHasProgram] = useState(false);

  return (
    <View style={componentStyles.mainContainer}>
      {hasProgram ? (
        <Text></Text>
      ) : (
        <View style={componentStyles.childContainer}> 
          <TextThemed style={textStyles.titleLargeB}>Luo treeniohjelma!</TextThemed>
          <ButtonComponent content="luo" onPress={() => setHasProgram(true)} />
        </View>
      )}

      {hasProgram && <CreatePlanForm />}
    </View>
  );
};

export default WorkoutPlanView;
