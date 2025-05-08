import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import TextThemed from './TextThemed';
import textStyles from '../styles/textStyles';
import AuthContext from "../configuration/AuthContext";

const TextFrame = ({ navigation, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <TextThemed style={textStyles.bodySmall}>
        <TextThemed style={styles.colored}>Salasana </TextThemed>
        <TextThemed>hukassa?</TextThemed>
      </TextThemed>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <TextThemed style={textStyles.bodySmall}>
          <TextThemed>Ei vielä tiliä? </TextThemed>
          <TextThemed style={styles.colored}>Rekisteröidy nyt!</TextThemed>
        </TextThemed>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

    container: {
        alignSelf: 'stretch',
        gap: 8,
        paddingVertical: 16,
        alignItems: 'center',

    },
    default: {
        fontSize: 12,
        color: '#FFFFFF',
    },
    colored: {
        color: "#638063",
    },

});

export default TextFrame;
