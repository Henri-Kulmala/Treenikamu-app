import React from 'react';
import InputFieldComponent from '../InputFieldComponent';
import CollapsibleSection from './CollapsibleSection';

export default function PersonalSection({
  isOpen,
  onToggle,
  form1,
  setForm1,
}) {
  return (
    <CollapsibleSection
      title="Käyttäjätiedot"
      isOpen={isOpen}
      completed={!!form1.email}
      onToggle={onToggle}
    >
      <InputFieldComponent
        header="Sähköposti"
        value={form1.email}
        editable={false}
      />
      <InputFieldComponent
        header="Salasana"
        placeholder="Uusi salasana"
        secureTextEntry
        value={form1.password}
        onChangeText={(password) => setForm1(prev => ({ ...prev, password }))}
      />
      <InputFieldComponent
        header="Vahvista salasana"
        placeholder="Uusi salasana uudelleen"
        secureTextEntry
        value={form1.confirm}
        onChangeText={(confirm) => setForm1(prev => ({ ...prev, confirm }))}
      />
    </CollapsibleSection>
  );
}