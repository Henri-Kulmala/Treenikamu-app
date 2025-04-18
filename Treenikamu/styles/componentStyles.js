import { StyleSheet } from "react-native";
import MainTheme from "./mainTheme";

const componentStyles = StyleSheet.create({
  // General Layouts
  mainContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: MainTheme.colors.dark,
  },
  scrollView: {
    paddingTop: 48,
    paddingBottom: 120,
    paddingHorizontal: 16,
    backgroundColor: MainTheme.colors.dark,
  },
  childContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 8,
    borderRadius: 16,
  },

  // Button Groups
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  buttonContainer: {
    width: 139,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    margin: 8,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.darkGreen,
  },
  buttonSelectEnabled: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 50,
    backgroundColor: MainTheme.colors.highlightGreen,
  },
  buttonSelectDisabled: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 50,
    backgroundColor: MainTheme.colors.highlightGreenMuted,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    color: MainTheme.colors.text,
  },

  // Button Color Variants
  dangerButton: {
    backgroundColor: MainTheme.colors.danger,
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightGreen,
  },
  prevButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.highlightGreen,
  },
  nextButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.highlightGreenMuted,
  },
  weekdayButton: {},

  // Input Fields
  inputField: {
    padding: 8,
    color: MainTheme.colors.text,
  },
  inputFieldNumber: {},

  // Number Picker
  numberPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Icon Buttons
  iconButtonDanger: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.danger,
  },
  iconButtonSuccess: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.highlightGreen,
  },

  // RegisterView
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.darkGreen,
  },
  section: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.background,
  },

  // Exercise Styles
  workoutDayStepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 16,
  },
  editExerciseInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  itemCardmd: {
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    marginVertical: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.highlightGreen,
  },
  cardGroupContainer: {},

  modalContainer: {
    padding: 24,
    gap: 8,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.text,
  },

  splitItemOpen: {
    width: 336,
    height: 160,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "stretch",
    padding: 24,
    gap: 8,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.darkGreen,
  },
  splitItemClosed: {
    width: 336,
    height: 160,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "stretch",
    padding: 24,
    gap: 8,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.highlightGreenMuted,
  },

  // StepControl styles
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 24,
  },
});

export default componentStyles;
