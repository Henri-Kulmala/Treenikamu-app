import * as React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Vector from "../assets/Google.svg"

const Frame = () => {
  	
  	return (
    		<View style={styles.vectorParent}>
      			<Vector style={styles.vectorIcon} width={23} height={24} />
      			<Text style={styles.googleSignIn}>Google Sign-in</Text>
    		</View>);
};

const styles = StyleSheet.create({
  	vectorIcon: {},
  	googleSignIn: {
    		alignSelf: "stretch",
    		fontSize: 12,
    		color: "#fff",
    		textAlign: "left"
  	},
  	vectorParent: {
    		alignItems: "center",
    		justifyContent: "center",
            textAlign: "center",
    		paddingTop: 24,
    		gap: 8,
  	}
});

export default Frame;
