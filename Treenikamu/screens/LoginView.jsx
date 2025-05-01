import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputFieldComponent from "../components/InputFieldComponent";
import componentStyles from "../styles/componentStyles";
import screensStyles from "../styles/screensStyles";
import Frame from "../components/GoogleIconFrame";
import TextFrame from "../components/TextFrame";
import AuthContext from "../configuration/AuthContext";
import LoginButton from "../components/LoginButton";
import ThemedText from "../components/TextThemed";
import textStyles from "../styles/textStyles";
import Alert from "../components/Alert";
import MainTheme from "../styles/mainTheme";

export default function LoginView({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setInputError(true);
      setError("Sähköposti ja salasana vaaditaan.");
      setDeleteModalVisible(true);
      return;
    }

    try {
      setInputError(false);
      setLoading(true);
      const response = await AuthContext.handleLogin(email, password);
      setLoading(false);

      if (response.success) {
        setEmail("");
        setPassword("");
        navigation.reset({ routes: [{ name: "Landing" }] });
      } else {
        setInputError(true);
        setError("Väärä sähköposti tai salasana.");
        setDeleteModalVisible(true);
      }
    } catch (err) {
      console.log(err, error);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View style={componentStyles.mainContainer}>
        <View style={screensStyles.loginView}>
            <Alert
              title="Virhe"
              message={error}
              isVisible={inputError}
              onRequestClose={() => setInputError(false)}
              actions={[{ text: "OK", onPress: () => setInputError(false) }]}
            />
          <View style={componentStyles.loginInputWrapper}>
            <InputFieldComponent
              onPress={() => setInputError(false)}
              placeholder="Sähköposti"
              value={email}
              onChangeText={setEmail}
              header={"Email"}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              autoCapitalize="none"
              isError={inputError}
            />
            <InputFieldComponent
              onPress={() => setInputError(false)}
              placeholder="Salasana"
              value={password}
              onChangeText={setPassword}
              header={"Salasana"}
              secureTextEntry={true}
              textContentType="password"
              autoComplete="password"
              autoCapitalize="none"
              isError={inputError}
            />
          </View>
          <View style={componentStyles.loginFooterWrapper}> 
            <LoginButton content="Kirjaudu sisään" onPress={handleLogin} />

            <Frame />
            <TextFrame navigation={navigation} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
