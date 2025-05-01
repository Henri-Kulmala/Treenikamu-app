import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView, ActivityIndicator } from "react-native";
import TextThemed from "../components/TextThemed";
import ButtonComponent from "../components/ButtonComponent";
import CreatePlanForm from "../components/workoutplan/CreatePlanForm";
import { generateWorkoutDates } from "../configuration/dateHelper";
import { Calendar } from "react-native-calendars";
import PlanDisplay from "../components/workoutplan/PlanDisplay";
import useCurrentUser from "../configuration/useCurrentUser";
import { useIsFocused } from "@react-navigation/native";
import { fetchAllExercises } from "../configuration/fetchExercises";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import { ref, set as firebaseSet } from "firebase/database";
import { database } from "../configuration/firebaseConfig";
import MainTheme from "../styles/mainTheme";

export default function WorkoutPlanView() {
  const { workoutplan, userId, loading: authLoading } = useCurrentUser();
  const [isCreating, setIsCreating] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);

  const [localDays, setLocalDays] = useState({});
  const [localRepeatWeeks, setLocalRepeatWeeks] = useState(1);
  const [weekDays, setWeekDays] = useState(null);
  const [repeatWeeks, setRepeatWeeks] = useState(null);
  const isFocused = useIsFocused();
  const dates = generateWorkoutDates({
    weekdays: weekDays,
    startDate: new Date(),
    weeks: repeatWeeks === Infinity ? 52 : repeatWeeks,
  });

  // const marked = dates.reduce((acc, d) => {
  //   const key = d.toISOString().slice(0, 10);
  //   acc[key] = { selected: true, marked: true };
  //   return acc;
  // }, {});

  useEffect(() => {
    fetchAllExercises().then(setExerciseData);
  }, []);

  useEffect(() => {
    if (workoutplan) {
      setLocalDays(workoutplan.days || {});
      setLocalRepeatWeeks(workoutplan.repeatWeeks || 1);
      setIsCreating(false);
    }
  }, [workoutplan]);



  if (authLoading) return <ActivityIndicator size="large" color={MainTheme.colors.highlightGreen} />;

  if (!workoutplan && !isCreating) {
    return (
      <View style={componentStyles.noPlanView}>
        <TextThemed style={textStyles.titleLargeB}>
          Luo treeniohjelma!
        </TextThemed>
        <ButtonComponent
          content="Luo ohjelma"
          onPress={() => setIsCreating(true)}
        />
      </View>
    );
  }

  if (!workoutplan && isCreating) {
    return <CreatePlanForm />;
  }

  return (
    <View style={componentStyles.createdPlanView}>
      {/*
        <Calendar
          markedDates={marked}
          style={componentStyles.calendar}
          theme={componentStyles.calendartheme}
          enableSwipeMonths={true}
          hideArrows={true}
        />
     */}
      <PlanDisplay
        days={localDays}
        setDays={(updater) =>
          setLocalDays((prev) =>
            typeof updater === "function" ? updater(prev) : updater
          )
        }
        exerciseData={exerciseData}
        repeatWeeks={localRepeatWeeks}
        showDeleteButton={true}
        showSaveButton={false}
        onSaveOverride={async () => {
          if (!userId) return;
          try {
            await firebaseSet(ref(database, `users/${userId}/workoutplan`), {
              days: localDays,
              repeatWeeks: localRepeatWeeks,
              savedAt: Date.now(),
            });
            Alert.alert("Tallennettu", "Treeniohjelmasi on päivitetty.");
          } catch (err) {
            console.error(err);
            Alert.alert("Virhe", "Päivitys epäonnistui.");
          }
        }}
      />
    </View>
  );
}
