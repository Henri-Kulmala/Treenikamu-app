import React from 'react';
import InputFieldComponent from '../InputFieldComponent';
import CollapsibleSection from './CollapsibleSection';

export default function ContactSection({
  isOpen,
  onToggle,
  form2,
  setForm2,
}) {
  return (
    <CollapsibleSection
      title="Yhteystiedot"
      isOpen={isOpen}
      completed={!!(form2.firstName && form2.lastName)}
      onToggle={onToggle}
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
      <InputFieldComponent
        header="Sukupuoli"
        placeholder="mies/nainen/muu"
        value={form2.gender}
        autoCapitalize="none"
        onChangeText={(gender) => setForm2(prev => ({ ...prev, gender }))}
      />
      <InputFieldComponent
        placeholder="Katuosoite"
        header="Katuosoite"
        value={form2.address}
        onChangeText={(address) => setForm2(prev => ({ ...prev, address }))}
      />
      <InputFieldComponent
        placeholder="Postinumero"
        header="Postinumero"
        keyboardType="numeric"
        value={form2.zip}
        onChangeText={(zip) => setForm2(prev => ({ ...prev, zip }))}
      />
      <InputFieldComponent
        placeholder="Kaupunki"
        header="Kaupunki"
        value={form2.city}
        onChangeText={(city) => setForm2(prev => ({ ...prev, city }))}
      />
    </CollapsibleSection>
  );
}