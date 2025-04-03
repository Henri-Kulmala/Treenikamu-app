import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Slider } from 'react-native-elements';
import InputFieldComponent from '../components/InputFieldComponent';
import screensStyles from '../constants/screensStyles';
import componentStyles from '../constants/componentStyles';
import MainTheme from '../constants/mainTheme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CheckHeader = ({ title, isOpen, completed, toggleOpen }) => (
  <TouchableOpacity
    onPress={toggleOpen}
    style={[styles.header, { opacity: isOpen ? 1 : 0.4 }]}
  >
    <Text style={styles.headerText}>{title}</Text>
    <Ionicons
      name={completed ? 'checkmark-circle' : 'close-circle'}
      size={24}
      color={completed ? 'green' : 'red'}
      style={{ marginLeft: 10 }}
    />
  </TouchableOpacity>
);

const RegisterView = ({ navigation }) => {
  const [openSection, setOpenSection] = useState(null);

  const [form1, setForm1] = useState({ email: '', password: '', confirm: '' });
  const [form2, setForm2] = useState({ first: '', last: '', gender: '', address: '', zip: '', city: '' });
  const [form3, setForm3] = useState({ weight: '', age: '', height: '', fitness: 1, level: 1 });

  const toggleSection = (index) => {
    LayoutAnimation.easeInEaseOut();
    setOpenSection(openSection === index ? null : index);
  };

  const isForm1Complete = form1.email && form1.password && form1.confirm;
  const isForm2Complete = form2.first && form2.last && form2.gender && form2.address && form2.zip && form2.city;
  const isForm3Complete = form3.weight && form3.age && form3.height;

  return (
    <View style={componentStyles.mainContainer}>  
    <View style={screensStyles.loginView}>
      <CheckHeader
        title="Käyttäjätiedot"
        isOpen={openSection === 1}
        completed={!!isForm1Complete}
        toggleOpen={() => toggleSection(1)}
      />
      {openSection === 1 && (
        <View style={styles.section}>
          <InputFieldComponent header="Sähköpostiosoite" placeholder="example@email.com" value={form1.email} onChangeText={(email) => setForm1({ ...form1, email })} />
          <InputFieldComponent header="Salasana" placeholder="********" value={form1.password} onChangeText={(password) => setForm1({ ...form1, password })} />
          <InputFieldComponent header="Syötä salasana uudelleen" placeholder="********" value={form1.confirm} onChangeText={(confirm) => setForm1({ ...form1, confirm })} />
        </View>
      )}

      <CheckHeader
        title="Yhteystiedot"
        isOpen={openSection === 2}
        completed={!!isForm2Complete}
        toggleOpen={() => toggleSection(2)}
      />
      {openSection === 2 && (
        <View style={styles.section}>
          <InputFieldComponent header="Etunimi" placeholder="Etunimi" value={form2.first} onChangeText={(first) => setForm2({ ...form2, first })} />
          <InputFieldComponent header="Sukunimi" placeholder="Sukunimi" value={form2.last} onChangeText={(last) => setForm2({ ...form2, last })} />
          <InputFieldComponent header="Sukupuoli" placeholder="mies/nainen/muu" value={form2.gender} onChangeText={(gender) => setForm2({ ...form2, gender })} />
          <InputFieldComponent header="Katuosoite" placeholder="Katuosoite" value={form2.address} onChangeText={(address) => setForm2({ ...form2, address })} />
          <InputFieldComponent header="Postinumero" placeholder="12345" value={form2.zip} onChangeText={(zip) => setForm2({ ...form2, zip })} />
          <InputFieldComponent header="Kaupunki" placeholder="Kaupunki" value={form2.city} onChangeText={(city) => setForm2({ ...form2, city })} />
        </View>
      )}

      <CheckHeader
        title="Fysiikka"
        isOpen={openSection === 3}
        completed={!!isForm3Complete}
        toggleOpen={() => toggleSection(3)}
      />
      {openSection === 3 && (
        <View style={styles.section}>
          <InputFieldComponent header="Paino" placeholder="Paino (kg)" value={form3.weight} onChangeText={(weight) => setForm3({ ...form3, weight })} />
          <InputFieldComponent header="Ikä" placeholder="esim. 25-30" value={form3.age} onChangeText={(age) => setForm3({ ...form3, age })} />
          <InputFieldComponent header="Pituus" placeholder="cm" value={form3.height} onChangeText={(height) => setForm3({ ...form3, height })} />

          <Text style={styles.sliderLabel}>Kunto: {['huono', 'keskitaso', 'hyvä'][form3.fitness - 1]}</Text>
          <Slider
            minimumValue={1}
            maximumValue={3}
            step={1}
            value={form3.fitness}
            onValueChange={(val) => setForm3({ ...form3, fitness: val })}
            thumbTintColor="#638063"
          />

          <Text style={styles.sliderLabel}>Taso: {['Aloittelija', 'Kokenut', 'Ammattilainen'][form3.level - 1]}</Text>
          <Slider
            minimumValue={1}
            maximumValue={3}
            step={1}
            value={form3.level}
            onValueChange={(val) => setForm3({ ...form3, level: val })}
            thumbTintColor="#638063"
          />
        </View>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ marginTop: 16, color: '#638063', fontWeight: 'bold' }}>
          Onko sinulla jo tili? Kirjaudu sisään.
        </Text>
      </TouchableOpacity>
    </View>
    </View>  
  );
};

const styles = {
  header: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    backgroundColor: MainTheme.colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  sliderLabel: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
};

export default RegisterView;