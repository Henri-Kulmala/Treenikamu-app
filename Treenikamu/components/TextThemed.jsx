import React from 'react';
import { Text } from 'react-native';

const ThemedText = ({ style, children, color, ...props }) => {
  return (
    <Text style={[{ fontFamily: 'Manrope-R' }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;