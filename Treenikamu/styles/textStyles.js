import { StyleSheet } from "react-native";
import MainTheme from "./mainTheme";

const textStyles = StyleSheet.create({
  bodySmall: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
  },
  bodySmallDark: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.dark,
  },
  bodyLarge: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
  },
  bodyLargeB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
  },
  bodyLargeBGreen: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.highlightGreen,
  },
  bodyLargeBDark: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.dark,
  },
  buttonText: {
    fontFamily: "Manrope-EB",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
    textTransform: "uppercase",
  },
  buttonTextMuted: {
    fontFamily: "Manrope-EB",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.textMuted,
    textTransform: "uppercase",
  },

  titleLarge: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.text,
  },
  titleLargeB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.text,
  },
  titleLargeBDark: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.dark,
  },
  titleSmall: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
  },
  titleSmallDark: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.dark,
  },
  titleSmallBDark: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.dark,
  },
  titleSmallB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
  },
  sliderLabel: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  inputLabel: {
    marginBottom: 8,
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
  },
  inputLabelDark: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.dark,
  },
  
});

export default textStyles;
