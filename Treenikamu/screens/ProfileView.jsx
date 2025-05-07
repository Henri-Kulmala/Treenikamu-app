import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
  ScrollView,
} from "react-native";
import TextThemed from "../components/TextThemed";
import MainTheme from "../styles/mainTheme";
import textStyles from "../styles/textStyles";

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
import { SafeAreaView } from "react-native-safe-area-context";
import SelectButton from "../components/SelectButton";

export default function ProfileView({ navigation }) {
  const { userId, user, loading: authLoading } = useCurrentUser();
  const [openSection, setOpenSection] = useState(true);

  const [form1, setForm1] = useState({ email: "", password: "", confirm: "" });
  const [form2, setForm2] = useState({
    firstName: "",
    lastName: "",
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
    <View style={componentStyles.profileContainer}>
      <View  style={componentStyles.profileSectionContainer}>

         <PersonalSection
        isOpen={openSection === 1}
        onToggle={() => toggleSection(1)}
        form1={form1}
        setForm1={setForm1}
        hideIcon={true}
      />

      <ContactSection
        isOpen={openSection === 2}
        onToggle={() => toggleSection(2)}
        form2={form2}
        setForm2={setForm2}
        hideIcon={true}
      />

      <StatsSection
        isOpen={openSection === 3}
        onToggle={() => toggleSection(3)}
        form3={form3}
        setForm3={setForm3}
        hideIcon={true}
      />
      </View>
     

      <View style={componentStyles.profileFooter}>
        <View style={componentStyles.itemCardText}>
          <TextThemed style={textStyles.bodySmall}>
            Poista tili ja kaikki tallentamasi tiedot.
          </TextThemed>
        </View>
        <View style={componentStyles.footerSection}>
          <SelectButton
            onPress={handleLogout}
            type="icon"
            iconName="log-out"
            iconSize={32}
            iconType="danger"
          />
        </View>
      </View>
    </View>
  );
}
