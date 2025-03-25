import { View, Text, Alert, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";

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
    <TouchableWithoutFeedback>
      <View>
        <Text>Login</Text>
        <Text>{error}</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        { /* Propsit ? */ }
        <ButtonComponent/>

      </View>
    </TouchableWithoutFeedback>
  );
}
