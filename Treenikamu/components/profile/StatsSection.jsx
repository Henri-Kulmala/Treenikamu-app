import React from 'react';
import { Slider } from 'react-native-elements';
import InputFieldComponent from '../InputFieldComponent';
import TextThemed from '../TextThemed';
import CollapsibleSection from './CollapsibleSection';
import textStyles from '../../styles/textStyles';
import MainTheme from '../../styles/mainTheme';

export default function StatsSection({
  isOpen,
  onToggle,
  form3,
  setForm3,
}) {
  return (
    <CollapsibleSection
      title="Fysiikka"
      isOpen={isOpen}
      completed={!!(form3.weight && form3.age && form3.height)}
      onToggle={onToggle}
    >
      <InputFieldComponent
        header="Paino (kg)"
        inputStyle="number"
        value={form3?.weight || ""}
        onChangeText={(weight) => setForm3(prev => ({ ...prev, weight }))}
      />
      <InputFieldComponent
        header="Ikä"
        inputStyle="number"
        value={form3?.age || 20}
        onChangeText={(age) => setForm3(prev => ({ ...prev, age }))}
      />
      <InputFieldComponent
        header="Pituus (cm)"
        inputStyle="number"
        value={form3?.height || 170}
        onChangeText={(height) => setForm3(prev => ({ ...prev, height }))}
      />

      <TextThemed style={textStyles.sliderLabel}>
        Kunto: {['huono', 'keskitaso', 'hyvä'][form3.fitness - 1]}
      </TextThemed>
      <Slider
        minimumValue={1}
        maximumValue={3}
        step={1}
        value={form3.fitness}
        onValueChange={(fitness) => setForm3(prev => ({ ...prev, fitness }))}
        thumbTintColor={MainTheme.colors.highlightGreen}
      />

      <TextThemed style={textStyles.sliderLabel}>
        Taso: {['Aloittelija', 'Kokenut', 'Ammattilainen'][form3.level - 1]}
      </TextThemed>
      <Slider
        minimumValue={1}
        maximumValue={3}
        step={1}
        value={form3.level}
        onValueChange={(level) => setForm3(prev => ({ ...prev, level }))}
        thumbTintColor={MainTheme.colors.highlightGreen}
      />
    </CollapsibleSection>
  );
}
