import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const TextFrame = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.default}>
        <Text style={styles.colored}>Salasana </Text>
        <Text>hukassa?</Text>
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.default}>
          <Text>Ei vielä tiliä? </Text>
          <Text style={styles.colored}>Rekisteröidy nyt!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
