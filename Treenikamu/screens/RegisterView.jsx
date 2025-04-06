import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Slider } from "react-native-elements";
import InputFieldComponent from "../components/InputFieldComponent";
import screensStyles from "../constants/screensStyles";
import componentStyles from "../constants/componentStyles";
import MainTheme from "../constants/mainTheme";
import TextThemed from "../components/TextThemed";
import textStyles from "../constants/textStyles";
import ButtonComponent from "../components/ButtonComponent";
import AuthContext from "../constants/AuthContext";

const CheckHeader = ({ title, isOpen, completed, toggleOpen }) => (
  <TouchableOpacity
    onPress={toggleOpen}
    style={[styles.header, { opacity: isOpen ? 1 : 0.4 }]}
  >
    <TextThemed style={textStyles.sliderLabel}>{title}</TextThemed>
    <Ionicons
      name={completed ? "checkmark-circle" : "close-circle"}
      size={24}
      color={completed ? "green" : "red"}
      style={{ marginLeft: 10 }}
    />
  </TouchableOpacity>
);

const RegisterView = ({ navigation }) => {
  const [openSection, setOpenSection] = useState(null);
  const [error, setError] = useState(null);

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

    if (!emailRegex.test(form1.email)) return "Virheellinen sähköpostiosoite.";
    if (!passwordRegex.test(form1.password))
      return "Salasanan tulee olla vähintään 8 merkkiä, sisältää ison kirjaimen ja erikoismerkin.";
    if (form1.password !== form1.confirm) return "Salasanat eivät täsmää.";

    if (!numberRegex.test(form3.age)) return "Ikä pitää olla numero.";
    if (!numberRegex.test(form3.height)) return "Pituus pitää olla numero.";
    if (!numberRegex.test(form3.weight)) return "Paino pitää olla numero.";
    if (!numberRegex.test(form2.zip)) return "Postinumero pitää olla numero.";

    if (!genderOptions.includes(form2.gender.toLowerCase()))
      return "Sukupuolen tulee olla mies, nainen tai muu.";

    return null;
  };

  const handleRegister = async () => {
    const validationError = validateInputs();
    if (validationError) {
      Alert.alert("Virhe", validationError);
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
        Alert.alert(
          "Rekisteröinti epäonnistui",
          response.error || "Tuntematon virhe"
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Virhe", "Jotain meni pieleen. Yritä myöhemmin uudelleen.");
    }
  };

  const updateForm3 = (field, value) => {
    setForm3((prev) => ({ ...prev, [field]: value }));
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
        {openSection === 1 && (
          <View style={styles.section}>
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
          <View style={styles.section}>
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
          <View style={styles.section}>
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

const styles = {
  header: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  section: {
    backgroundColor: MainTheme.colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "100%",
  },
  sliderLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
};

export default RegisterView;
