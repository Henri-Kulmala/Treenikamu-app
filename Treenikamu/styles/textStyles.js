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
    fontWeight: MainTheme.fontWeights.regular,
  },
  bodyLargeB: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  bodyLargeBDark: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.dark,
    fontWeight: MainTheme.fontWeights.regular,
  },
  buttonText: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.bold,
    textTransform: "uppercase",
  },
  titleLarge: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  titleLargeB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.bold,
  },
  titleLargeBDark: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.dark,
    fontWeight: MainTheme.fontWeights.bold,
  },
  titleSmall: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  titleSmallDark: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.dark,
    fontWeight: MainTheme.fontWeights.regular,
  },
  titleSmallBDark: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.dark,
    fontWeight: MainTheme.fontWeights.bold,
  },
  titleSmallB: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.bold,
  },
  sliderLabel: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
    marginTop: 16,
    marginBottom: 8,
  },
  inputLabel: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  inputLabelDark: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.dark,
    fontWeight: MainTheme.fontWeights.regular,
  },
});

export default textStyles;
