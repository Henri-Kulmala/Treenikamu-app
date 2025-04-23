import React from "react";
import { TouchableOpacity } from "react-native";
import componentStyles from "../styles/componentStyles";
import ThemedText from "./TextThemed";
import MainTheme from "../styles/mainTheme";
import textStyles from "../styles/textStyles";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function LoginButton({ content, type = "default", onPress, ...props }) {
 


  return (
    <TouchableOpacity style={componentStyles.loginButton} onPress={onPress} {...props}>
      <ThemedText style={componentStyles.buttonText}>{content}</ThemedText>
        <Ionicons name="log-in" size={20} color={MainTheme.colors.text} style={componentStyles}/>
    </TouchableOpacity>
  );
}


