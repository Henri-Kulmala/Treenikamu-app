import React from 'react';
import InputFieldComponent from '../InputFieldComponent';
import CollapsibleSection from './CollapsibleSection';

export default function ContactSection({
  isOpen,
  onToggle,
  form2,
  setForm2,
  hideIcon 
}) {
  return (
    <CollapsibleSection
      title="Yhteystiedot"
      isOpen={isOpen}
      completed={!!(form2.firstName && form2.lastName)}
      onToggle={onToggle}
      isHidden={hideIcon}
    >
      <InputFieldComponent
        placeholder="Etunimi"
        header="Etunimi"
        textContentType="firstName"
        autoComplete="given-name"
        value={form2.firstName}
        onChangeText={(firstName) => setForm2(prev => ({ ...prev, firstName }))}
      />
      <InputFieldComponent
        placeholder="Sukunimi"
        header="Sukunimi"
        textContentType="lastName"
        autoComplete="family-name"
        value={form2.lastName}
        onChangeText={(lastName) => setForm2(prev => ({ ...prev, lastName }))}
      />

    </CollapsibleSection>
  );
}