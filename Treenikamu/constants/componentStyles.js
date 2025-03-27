import { StyleSheet } from "react-native";
import MainTheme from "./mainTheme";

const componentStyles = StyleSheet.create({

    mainContainer: {
        backgroundColor: MainTheme.colors.dark,
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
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
    flexDirection: "column",
    maxWidth: 248,
    maxHeight: 64,
    gap: 16,
    marginBottom: 16,

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
