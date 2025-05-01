import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";

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
import ContactSection from "../components/profile/ContactSection";
import PersonalSection from "../components/profile/PersonalSection";
import StatsSection from "../components/profile/StatsSection";

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

    if (!emailRegex.test(form1.email))
      setError("Virheellinen sähköpostiosoite."), setIsInputError(true);
    if (!passwordRegex.test(form1.password))
      setError(
        "Salasanan tulee olla vähintään 8 merkkiä, sisältää ison kirjaimen ja erikoismerkin."
      ),
        setIsInputError(true);
    if (form1.password !== form1.confirm)
      setError("Salasanat eivät täsmää."), setIsInputError(true);

    if (!numberRegex.test(form3.age))
      setError("Ikä pitää olla numero."), setIsInputError(true);
    if (!numberRegex.test(form3.height))
      setError("Pituus pitää olla numero."), setIsInputError(true);
    if (!numberRegex.test(form3.weight))
      setError("Paino pitää olla numero."), setIsInputError(true);
    if (!numberRegex.test(form2.zip))
      setError("Postinumero pitää olla numero."), setIsInputError(true);

    if (!genderOptions.includes(form2.gender.toLowerCase()))
      setError("Sukupuolen tulee olla mies, nainen tai muu."),
        setIsInputError(true);

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
        setErrorVisible(true);
      }
    } catch (err) {
      console.log(err);
      setError("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
      setErrorVisible(true);
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
      <PersonalSection
        isOpen={openSection === 1}
        onToggle={() => toggleSection(1)}
        form1={form1}
        setForm1={setForm1}
        emailEditable={true}
      />

      <ContactSection
        isOpen={openSection === 2}
        onToggle={() => toggleSection(2)}
        form2={form2}
        setForm2={setForm2}
      />

      <StatsSection
        isOpen={openSection === 3}
        onToggle={() => toggleSection(3)}
        form3={form3}
        setForm3={setForm3}
      />

      <View style={componentStyles.loginFooterWrapper}>
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
