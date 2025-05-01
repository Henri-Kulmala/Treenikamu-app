import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, LayoutAnimation, Alert } from "react-native";
import TextThemed from "../components/TextThemed";
import MainTheme from "../styles/mainTheme";

import useCurrentUser from "../configuration/useCurrentUser";
import { ref, set } from "firebase/database";
import { database, auth } from "../configuration/firebaseConfig";

import CollapsibleSection from "../components/profile/CollapsibleSection";
import ContactSection from "../components/profile/ContactSection";
import PersonalSection from "../components/profile/PersonalSection";
import StatsSection from "../components/profile/StatsSection";
import SaveButton from "../components/profile/SaveButton";
import componentStyles from "../styles/componentStyles";
import ButtonComponent from "../components/ButtonComponent";
import LogoutButton from "../components/LogoutButton";

export default function ProfileView({ navigation }) {
  const { userId, user, loading: authLoading } = useCurrentUser();
  const [openSection, setOpenSection] = useState(null);

  const [form1, setForm1] = useState({ email: "", password: "", confirm: "" });
  const [form2, setForm2] = useState({
    firstName: "",
    lastName: "",
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

  useEffect(() => {
    if (!authLoading && user) {
      setForm1({ email: user.email || "", password: "", confirm: "" });
      setForm2({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        address: user.address || "",
        zip: user.zip || "",
        city: user.city || "",
      });
      setForm3({
        weight: user.weight?.toString() || "",
        age: user.age?.toString() || "",
        height: user.height?.toString() || "",
        fitness: user.fitness || 1,
        level: user.level || 1,
      });
    }
  }, [authLoading, user]);

  const toggleSection = (idx) => {
    LayoutAnimation.easeInEaseOut();
    setOpenSection(openSection === idx ? null : idx);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const handleSave = async () => {
    if (!userId) return;
    const updated = {
      email: form1.email,
      firstName: form2.firstName,
      lastName: form2.lastName,
      gender: form2.gender,
      address: form2.address,
      zip: form2.zip,
      city: form2.city,
      weight: Number(form3.weight),
      age: Number(form3.age),
      height: Number(form3.height),
      fitness: form3.fitness,
      level: form3.level,
    };
    try {
      await set(ref(database, `users/${userId}`), updated);
      Alert.alert("Tallennettu", "Profiilisi on päivitetty.");
    } catch (err) {
      console.error(err);
      Alert.alert("Virhe", "Tallennus epäonnistui.");
    }
  };

  if (authLoading) {
    return <TextThemed>Loading profile…</TextThemed>;
  }

  return (
    <View style={componentStyles.mainContainer}>
      <PersonalSection
        isOpen={openSection === 1}
        onToggle={() => toggleSection(1)}
        form1={form1}
        setForm1={setForm1}
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
      <View style={componentStyles.buttonWrapper}>
        <SaveButton onPress={handleSave} disabled={!userId} />
        <LogoutButton content="Kirjaudu ulos" onPress={handleLogout} />
      </View>
    </View>
  );
}
