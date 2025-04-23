import React from 'react';
import ButtonComponent from '../ButtonComponent';

export default function SaveButton({ onPress, disabled }) {
  return (
    <ButtonComponent
      content="Tallenna profiili"
      onPress={onPress}
      disabled={disabled}
    />
  );
}