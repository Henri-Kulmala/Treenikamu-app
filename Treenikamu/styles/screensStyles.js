import { StyleSheet } from "react-native";
import MainTheme from "./mainTheme";

const screensStyles = StyleSheet.create({
  loginView: {
    width: "100%",
    paddingHorizontal: 48,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  
  registerSection: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "100%",
  },
  registerHeader: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  registerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  registerSliderLabel: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  
});

export default screensStyles;
