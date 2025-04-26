import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";

import { Slider } from "react-native-elements";
import InputFieldComponent from "../components/InputFieldComponent";
import screensStyles from "../styles/screensStyles";
import componentStyles from "../styles/componentStyles";
import MainTheme from "../styles/mainTheme";
import TextThemed from "../components/TextThemed";
import textStyles from "../styles/textStyles";
import ButtonComponent from "../components/ButtonComponent";
import AuthContext from "../configuration/AuthContext";
import CheckHeader from "../components/CheckHeader";
import Alert from "../components/Alert";



const RegisterView = ({ navigation }) => {
  const [openSection, setOpenSection] = useState(null);
  const [error, setError] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  
  const [form1, setForm1] = useState({ email: "", password: "", confirm: "" });
  const [form2, setForm2] = useState({
    first: "",
    last: "",
    gender: "",
    address: "",
    zip: "",
    city: "",
  });
  const [form3, setForm3] = useState({
    weight: "",
    age: "",
    height: "",
    fitness: 1,
    level: 1,
  });

  const toggleSection = (index) => {
    LayoutAnimation.easeInEaseOut();
    setOpenSection(openSection === index ? null : index);
  };

  const isForm1Complete = form1.email && form1.password && form1.confirm;
  const isForm2Complete =
    form2.first &&
    form2.last &&
    form2.gender &&
    form2.address &&
    form2.zip &&
    form2.city;
  const isForm3Complete = form3.weight && form3.age && form3.height;

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    const numberRegex = /^\d+$/;
    const genderOptions = ["mies", "nainen", "muu"];

    if (!emailRegex.test(form1.email)) setError("Virheellinen sähköpostiosoite."), setIsInputError(true) ;
    if (!passwordRegex.test(form1.password))
      setError("Salasanan tulee olla vähintään 8 merkkiä, sisältää ison kirjaimen ja erikoismerkin.") , setIsInputError(true) ;
    if (form1.password !== form1.confirm) setError("Salasanat eivät täsmää.") , setIsInputError(true) ;

    if (!numberRegex.test(form3.age)) setError("Ikä pitää olla numero.") , setIsInputError(true) ;
    if (!numberRegex.test(form3.height)) setError("Pituus pitää olla numero.") , setIsInputError(true) ;
    if (!numberRegex.test(form3.weight)) setError("Paino pitää olla numero.") , setIsInputError(true) ;
    if (!numberRegex.test(form2.zip)) setError("Postinumero pitää olla numero.") , setIsInputError(true) ;

    if (!genderOptions.includes(form2.gender.toLowerCase()))
      setError("Sukupuolen tulee olla mies, nainen tai muu.") , setIsInputError(true) ;

    return null;
  };



  const handleRegister = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const newUser = {
        email: form1.email,
        password: form1.password,
        ...form2,
        ...form3,
      };
      const response = await AuthContext.handleRegister(newUser);

      if (response.success) {
        navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
      } else {
        setError(
          "Rekisteröinti epäonnistui",
          response.error || "Tuntematon virhe"
         
        );
        setErrorVisible(true)
      }
    } catch (err) {
      console.log(err);
      setError("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
      setErrorVisible(true)
    }
  };

  const updateForm3 = (field, value) => {
    setForm3((prev) => ({ ...prev, [field]: value }));
  };

  const disableAlert = () => {
    setError(null);
    setErrorVisible(false);
  };

  return (
    <View style={componentStyles.mainContainer}>
      <View style={screensStyles.loginView}>
        <CheckHeader
          title="Käyttäjätiedot"
          isOpen={openSection === 1}
          completed={!!isForm1Complete}
          toggleOpen={() => toggleSection(1)}
        />
        <Alert
          title="Virhe"
          message={error}
          isVisible={!!errorVisible}
          onRequestClose={() => setError(null)}
          actions={[{ text: "OK", onPress: () => disableAlert()}]}
        
        />

        {openSection === 1 && (
          <View style={componentStyles.section}>
            <InputFieldComponent
              header="Sähköpostiosoite"
              placeholder="example@email.com"
              value={form1.email}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              autoCapitalize="none"
              onChangeText={(email) => setForm1({ ...form1, email })}
              onBlur={validateInputs}
              isError={isInputError}
            />
            <InputFieldComponent
              header="Salasana"
              placeholder="********"
              value={form1.password}
              secureTextEntry={true}
              textContentType="password"
              autoComplete="password"
              autoCapitalize="none"
              onChangeText={(password) => setForm1({ ...form1, password })}
              onBlur={validateInputs}
              isError={isInputError}
            />
            <InputFieldComponent
              header="Syötä salasana uudelleen"
              placeholder="********"
              value={form1.confirm}
              secureTextEntry={true}
              textContentType="password"
              autoComplete="password"
              autoCapitalize="none"
              onChangeText={(confirm) => setForm1({ ...form1, confirm })}
              onBlur={validateInputs}
              isError={isInputError}
            />
          </View>
        )}

        <CheckHeader
          title="Yhteystiedot"
          isOpen={openSection === 2}
          completed={!!isForm2Complete}
          toggleOpen={() => toggleSection(2)}
        />
        {openSection === 2 && (
          <View style={componentStyles.section}>
            <InputFieldComponent
              header="Etunimi"
              placeholder="Etunimi"
              value={form2.first}
              onChangeText={(first) => setForm2({ ...form2, first })}
            />
            <InputFieldComponent
              header="Sukunimi"
              placeholder="Sukunimi"
              value={form2.last}
              onChangeText={(last) => setForm2({ ...form2, last })}
            />
            <InputFieldComponent
              header="Sukupuoli"
              placeholder="mies/nainen/muu"
              value={form2.gender}
              onChangeText={(gender) => setForm2({ ...form2, gender })}
              onBlur={validateInputs}
            />
            <InputFieldComponent
              header="Katuosoite"
              placeholder="Katuosoite"
              value={form2.address}
              onChangeText={(address) => setForm2({ ...form2, address })}
            />
            <InputFieldComponent
              header="Postinumero"
              placeholder="12345"
              value={form2.zip}
              onChangeText={(zip) => setForm2({ ...form2, zip })}
              onBlur={validateInputs}
            />
            <InputFieldComponent
              header="Kaupunki"
              placeholder="Kaupunki"
              value={form2.city}
              onChangeText={(city) => setForm2({ ...form2, city })}
            />
          </View>
        )}

        <CheckHeader
          title="Fysiikka"
          isOpen={openSection === 3}
          completed={!!isForm3Complete}
          toggleOpen={() => toggleSection(3)}
        />
        {openSection === 3 && (
          <View style={componentStyles.section}>
            <InputFieldComponent
              header="Paino"
              placeholder="Paino (kg)"
              value={form3.weight}
              onChangeText={(weight) => updateForm3("weight", weight)}
              onBlur={validateInputs}
            />
            <InputFieldComponent
              header="Ikä"
              placeholder="esim. 25-30"
              value={form3.age}
              onChangeText={(age) => updateForm3("age", age)}
              onBlur={validateInputs}
            />
            <InputFieldComponent
              header="Pituus"
              placeholder="cm"
              value={form3.height}
              onChangeText={(height) => updateForm3("height", height)}
              onBlur={validateInputs}
            />

            <TextThemed style={textStyles.sliderLabel}>
              Kunto: {["huono", "keskitaso", "hyvä"][form3.fitness - 1]}
            </TextThemed>
            <Slider
              minimumValue={1}
              maximumValue={3}
              step={1}
              value={form3.fitness}
              onValueChange={(val) => updateForm3("fitness", val)}
              thumbTintColor="#638063"
            />

            <TextThemed style={textStyles.sliderLabel}>
              Taso:{" "}
              {["Aloittelija", "Kokenut", "Ammattilainen"][form3.level - 1]}
            </TextThemed>
            <Slider
              minimumValue={1}
              maximumValue={3}
              step={1}
              value={form3.level}
              onValueChange={(val) => updateForm3("level", val)}
              thumbTintColor={MainTheme.colors.highlightGreen}
            />
          </View>
        )}

        <ButtonComponent
          content="Luo tili"
          type="success"
          onPress={handleRegister}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <TextThemed
            style={{ marginTop: 16, color: "#FFFFFF", fontWeight: "bold" }}
          >
            Onko sinulla jo tili?
          </TextThemed>
          <TextThemed style={{ color: "#638063", fontWeight: "bold" }}>
            Kirjaudu sisään.
          </TextThemed>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default RegisterView;
