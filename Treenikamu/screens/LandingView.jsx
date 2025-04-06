import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../configuration/firebaseConfig";
import componentStyles from "../styles/componentStyles";
import TextThemed from "../components/TextThemed";
import textStyles from "../styles/textStyles";
import ButtonComponent from "../components/ButtonComponent";

const LandingView = () => {
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

  return (
    <View style={componentStyles.mainContainer}>
      <View style={componentStyles.childContainer}>
        <TextThemed style={textStyles.titleLargeB}>
          Tervetuloa treenikamu-sovellukseen 💪
        </TextThemed>
        <TextThemed style={textStyles.bodyLarge}>
          Tälle sivulle tulee näkymä treeneistä ja tilastoista
        </TextThemed>
        <ButtonComponent content="kirjaudu ulos" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default LandingView;
