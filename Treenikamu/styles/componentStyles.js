import { StyleSheet } from "react-native";
import MainTheme from "./mainTheme";

const componentStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: MainTheme.colors.dark,
    padding: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  scrollView: {
    paddingTop: 48,
    paddingBottom: 120,
    paddingHorizontal: 16,
    backgroundColor: MainTheme.colors.dark,
  },
  childContainer: {
    borderRadius: 16,
    padding: 24,
    gap: 8,
    alignContent: "center",
    alignItems: "center",
  },

  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
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
  buttonSelectDisabled: {
    backgroundColor: MainTheme.colors.highlightGreenMuted,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  buttonSelectEnabled: {
    backgroundColor: MainTheme.colors.highlightGreen,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 35,
    height: 35,
    borderRadius: 50,
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
  prevButton: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: MainTheme.colors.highlightGreen,

  },
  nextButton: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: MainTheme.colors.highlightGreenMuted,

  },
  weekdayButton: {

  },

  inputFieldContainer: {
    width: "100%",
    gap: 8,
    alignContent: "flex-end",
  },

  inputField: {
    backgroundColor: MainTheme.colors.dark20,
    borderRadius: 10,
    padding: 8,
    color: MainTheme.colors.text,
  },
  // RegisterView

  header: {
    backgroundColor: MainTheme.colors.darkGreen,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    backgroundColor: MainTheme.colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "100%",
  },
  

  // Exercise styles


  workoutDayStepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 16,
  },

  itemCardmd: {
    flexDirection: "row",
    height: 80,
    marginVertical: 16,
    backgroundColor: MainTheme.colors.highlightGreen,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  cardGroupContainer: {},
  modalContainer: {
    backgroundColor: MainTheme.colors.text,
    borderRadius: 16,
    padding: 24,
    gap: 8,
  },


  // StepControl styles

  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 24,
  }
});


export default componentStyles;
