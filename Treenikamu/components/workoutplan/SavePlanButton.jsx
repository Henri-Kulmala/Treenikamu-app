import React from 'react';
import { View } from 'react-native';
import ButtonComponent from '../ButtonComponent';
import componentStyles from '../../styles/componentStyles';

export default function SavePlanButton({ onPress }) {
  return (
    <View style={componentStyles.footerButton}>
      <ButtonComponent content="Tallenna muutokset" onPress={onPress} />
    </View>
  );
}