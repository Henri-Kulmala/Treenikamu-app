import React from 'react';
import { View } from 'react-native';
import CheckHeader from '../CheckHeader';
import componentStyles from '../../styles/componentStyles';

export default function CollapsibleSection({
  title,
  isOpen,
  completed,
  onToggle,
  children,
}) {
  return (
    <>
      <CheckHeader
        title={title}
        isOpen={isOpen}
        completed={completed}
        toggleOpen={onToggle}
      />
      {isOpen && <View style={componentStyles.section}>{children}</View>}
    </>
  );
}