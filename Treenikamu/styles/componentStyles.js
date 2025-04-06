import { StyleSheet } from "react-native";
import MainTheme from "./mainTheme";

const componentStyles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: MainTheme.colors.dark,
        padding: 24,

        
    },

  buttonContainer: {
    width: 139,
    height: 35,
    backgroundColor: MainTheme.colors.darkGreen, 
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    margin: 8,
  },
  buttonText: {
    color: MainTheme.colors.text,
    fontSize: 14,
    fontWeight: "700", 
    textTransform: "uppercase",
  },
  dangerButton: {
    backgroundColor: MainTheme.colors.danger,
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightGreen,
  },

inputFieldContainer: {
  width: "100%",
  gap: 8,
  alignSelf: "stretch"
},
inputField: {
    backgroundColor: MainTheme.colors.inputBackground,
    borderRadius: 10,
    padding: 8,
    color: MainTheme.colors.text,

},
inputHeader: {
    color: MainTheme.colors.text,
    fontSize: 12,
    fontWeight: "400",
},


});



export default componentStyles;
