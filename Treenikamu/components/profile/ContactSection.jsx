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
        header="Etunimi"
        value={form2.firstName}
        onChangeText={(firstName) => setForm2(prev => ({ ...prev, firstName }))}
      />
      <InputFieldComponent
        header="Sukunimi"
        value={form2.lastName}
        onChangeText={(lastName) => setForm2(prev => ({ ...prev, lastName }))}
      />
      <InputFieldComponent
        header="Sukupuoli"
        placeholder="mies/nainen/muu"
        value={form2.gender}
        onChangeText={(gender) => setForm2(prev => ({ ...prev, gender }))}
      />
      <InputFieldComponent
        header="Katuosoite"
        value={form2.address}
        onChangeText={(address) => setForm2(prev => ({ ...prev, address }))}
      />
      <InputFieldComponent
        header="Postinumero"
        keyboardType="numeric"
        value={form2.zip}
        onChangeText={(zip) => setForm2(prev => ({ ...prev, zip }))}
      />
      <InputFieldComponent
        header="Kaupunki"
        value={form2.city}
        onChangeText={(city) => setForm2(prev => ({ ...prev, city }))}
      />
    </CollapsibleSection>
  );
}