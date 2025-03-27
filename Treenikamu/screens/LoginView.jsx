import { View, Text, Alert, TextInput, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonComponent  from "../components/ButtonComponent";
import InputFieldComponent  from "../components/InputFieldComponent";
import componentStyles from "../constants/componentStyles";

export default function LoginView({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Virhe");
      return;
    }

    try {
      setLoading(true);
      const response = await AuthContext.handleLogin(email, password);
      setLoading(false);

      if (response.success) {
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.log(err, error);
    }
  };

  return (
    <TouchableWithoutFeedback >
      <View>
        <Text>Login</Text>
        <Text>{error}</Text>
        <InputFieldComponent
          placeholder="Sähköposti"
          value={email}
          onChangeText={setEmail}
          header={"Email"}
        />
        <InputFieldComponent
          placeholder="Salasana"
          value={password}
          onChangeText={setPassword}
          header={"Salasana"}
        />

        <ButtonComponent
          content = "Kirjaudu sisään"
          type="default"
          onPress={handleLogin}
        />

      </View>
      
      <View>
        
      </View>
    </TouchableWithoutFeedback>
  );
}
