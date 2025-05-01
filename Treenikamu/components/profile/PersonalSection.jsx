import React from 'react';
import InputFieldComponent from '../InputFieldComponent';
import CollapsibleSection from './CollapsibleSection';

export default function PersonalSection({
  isOpen,
  onToggle,
  form1,
  setForm1,
  emailEditable = false,
}) {
  return (
    <CollapsibleSection
      title="Käyttäjätiedot"
      isOpen={isOpen}
      completed={!!form1.email && !!form1.password && !!form1.confirm}
      onToggle={onToggle}
    >
      <InputFieldComponent
        header="Sähköposti"
        placeholder="sähköpostiosoite"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        value={form1.email}
        editable={emailEditable}
        onChangeText={(email) => setForm1(prev => ({ ...prev, email }))}
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