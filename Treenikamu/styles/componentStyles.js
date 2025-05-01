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
    paddingTop: 0,
    paddingBottom: 120,
    paddingHorizontal: 36,
    backgroundColor: MainTheme.colors.dark,
  },
    

  childContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 8,
    borderRadius: 16,
  },
  titleWithDescription: {
    gap: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },


  // Button Groups
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
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
  floatingButton: {
    position: "fixed",
    bottom: 50,
    height: 60,
    left: 0,
    right: 0,
    justfifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    elevation: 5,
  },
  floatingButtonContainer: {
    flexDirection: "row", 
    paddingBottom: 16,
    justifyContent: "space-between",
  },

  // Button Color Variants
  dangerButton: {
    backgroundColor: MainTheme.colors.danger,
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightGreen,
  },
  saveButton: {
    backgroundColor: MainTheme.colors.highli,

  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 8,
    gap: 16,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.danger60,
  },

  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 8,
    gap: 16,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.highlightGreen60,
  },


  // Input Fields
  inputField: {
    padding: 8,
    color: MainTheme.colors.text,
    backgroundColor: MainTheme.colors.text20,
    borderRadius: 10,
  },
  inputError: {
    padding: 8,
    color: MainTheme.colors.text,
    backgroundColor: MainTheme.colors.text20,
    borderColor: MainTheme.colors.danger,
    borderBottomWidth: 4,
    borderRadius: 10,
  },

  inputFieldContainer: {
    width: "100%",
    alignContent: "flex-end",
    gap: 8,
  },

  inputFieldNumber: {
    padding: 8,
    color: MainTheme.colors.text,
    backgroundColor: MainTheme.colors.dark40,
    borderRadius: 8,

  },
  selectableWithTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    gap: 16,
    paddingHorizontal: 16,
  },
  loginInputWrapper: {
    width: "100%",
    padding: 12,
    marginVertical: 6,
    gap: 8,

  },
  loginFooterWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginVertical: 6,

  },

  // Number Picker
  numberPickerContainer: {
    gap: 8,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },

  // Icon Buttons
  iconButtonDanger: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.danger,
  },
  iconButtonSuccess: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.highlightGreen,
  },
  iconButtonStep: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  iconButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  iconButtonDisabled: {
    
    backgroundColor: MainTheme.colors.highlightGreenMuted,
    borderRadius: 50,

  },
  iconButtonEnabled: {
    backgroundColor: MainTheme.colors.highlightGreen,
    borderRadius: 50,
  },


  // RegisterView
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
  addExerciseModal: {
   flex: 1,
   borderRadius: 16,
   justifyContent: "center",
  },
  addExerciseModalContainer: {
   backgroundColor: MainTheme.colors.text,
   padding: 16,
   marginVertical: 16,
   borderRadius: 16,
   gap: 12,
   justifyContent: "center",
  },
  addExerciseModalList: {
    maxHeight: 300,
    padding: 16,
    
  },
  
  workoutWeekRepeatContainer: {
    backgroundColor: MainTheme.colors.darkGreen20,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
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
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 120,
    marginVertical: 16,
    padding: 10,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.text20,
  },
  itemCardText: {
    flex: 1,
    height: "100%",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    padding: 24,
    gap: 8,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.text,
  },
  modalActions: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  workoutDaySectionContainer: {
    width: "100%",
    marginBottom: 64,
  },

  exerciseListContainer: {
    gap: 4,
    marginTop: 16,

  },

  groupedExerciseHeader: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 24,
  },

  listItem: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: MainTheme.colors.darkGreen,
    padding: 8,
    marginVertical: 8,
  },

  noPlanView: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flex:1,
    gap: 8,
    backgroundColor: MainTheme.colors.dark,
  },
 
  modalImage:{
    width: 250,
    height: "auto",
    aspectRatio:1,
    padding: 8,
    borderRadius: 24,
  },
  modalImageWrapper:{
    justifyContent: "center",
    alignItems: "center",
    padding: 8,

  },
  editExerciseModalContainer: {
    padding: 16,
    borderRadius: 16,
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
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    elevation: 5,
    paddingHorizontal: 32,
    flexDirection: "row",
    backgroundColor: MainTheme.colors.dark20,
    justifyContent: "space-between",
  },


  formContainer: {
    height: "100%",
    paddingBottom: 120,
    paddingTop: 40,
    justifyContent: "space-between",
    alignContent: "center",

    backgroundColor: MainTheme.colors.dark,
  },
  createdPlanView: {
    flex: 1,
    paddingBottom: 120,
    paddingTop: 40,
    justifyContent: "space-between",
    alignContent: "center",

    backgroundColor: MainTheme.colors.dark,
  },

  // Profile Styles

  userInfoContainer: {
    alignItems: "center",
    marginVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: MainTheme.colors.text20,
  },

  // Calendar 

calendar: {
  borderRadius: 16,

  padding: 8,
  marginVertical: 8,
  width: "100%",
},
calendartheme: {
  calendarBackground:MainTheme.colors.darkGreen,
  textSectionTitleColor: MainTheme.colors.text,
  selectedDayBackgroundColor: MainTheme.colors.highlightGreen,
  selectedDayTextColor: MainTheme.colors.text,
  todayTextColor: MainTheme.colors.highlightGreen,
  monthTextColor: MainTheme.colors.text,
  dayTextColor: MainTheme.colors.dark,
  textDisabledColor: MainTheme.colors.darkGreen,

},



});




export default componentStyles;
