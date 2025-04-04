import React from 'react';
import { View, Text } from 'react-native';
import componentStyles from '../constants/componentStyles';

const LandingView = () => {
  return (
    <View style={componentStyles.mainContainer}>
      <Text style={{ color: '#fff', fontSize: 20 }}>Tervetuloa Treenikamuun!</Text>
    </View>
  );
};

export default LandingView;
