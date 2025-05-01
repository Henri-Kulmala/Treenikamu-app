// File: components/workoutplan/WorkoutPlanWrapper.jsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import useCurrentUser from "../configuration/useCurrentUser";
import { useIsFocused } from "@react-navigation/native";
import { ref, get, set } from "firebase/database";
import { database } from "../configuration/firebaseConfig";
import WorkoutPlan from "../components/workoutplan/WorkoutPlan";
import EditExerciseModal from "../components/workoutplan/EditExerciseModal";
import SavePlanButton from "../components/workoutplan/SavePlanButton";
import CreatePlanForm from "../components/workoutplan/CreatePlanForm";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import TextThemed from "../components/TextThemed";
import ButtonComponent from "../components/ButtonComponent";
import SelectButton from "../components/SelectButton";
import MainTheme from "../styles/mainTheme";
import StepControls from "../components/StepControls";
import screensStyles from "../styles/screensStyles";
import { fetchAllExercises } from "../configuration/fetchExercises";
import { generateWorkoutDates } from "../configuration/dateHelper";
import { Calendar } from "react-native-calendars";

export default function WorkoutPlanView() {
  const { userId, loading: authLoading } = useCurrentUser();
  const [plan, setPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [exerciseData, setExerciseData] = useState(null);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [activeExercise, setActiveExercise] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [isCreating, setIsCreating] = useState(null);
  const [weekDays, setWeekDays] = useState(null);
  const [repeatWeeks, setRepeatWeeks] = useState(null);
  const isFocused = useIsFocused();
  const dates = generateWorkoutDates({
    weekdays: weekDays,
    startDate: new Date(),
    weeks: repeatWeeks === Infinity ? 52 : repeatWeeks,
  });

  const marked = dates.reduce((acc, d) => {
    const key = d.toISOString().slice(0, 10);
    acc[key] = { selected: true, marked: true };
    return acc;
  }, {});

  useEffect(() => {
    if (authLoading || !userId) return;

    setLoadingPlan(true);
    get(ref(database, `users/${userId}/workoutplan`))
      .then((snap) => {
        if (!snap.exists()) return;
        const data = snap.val();
        setPlan(data);
        setWeekDays(data.selectedDays || []);
        setRepeatWeeks(data.repeatWeeks ?? Infinity);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Virhe", "Treeniohjelman lataus epäonnistui");
      })
      .finally(() => setLoadingPlan(false));
  }, [authLoading, userId, isFocused]);

  useEffect(() => {
    setLoadingExercises(true);
    fetchAllExercises()
      .then((data) => setExerciseData(data))
      .catch((err) => {
        console.error(err);
        Alert.alert("Virhe", "Liikkeiden lataus epäonnistui");
      })
      .finally(() => setLoadingExercises(false));
  }, []);

  const handleSaveExercise = (updatedEx) => {
    setPlan((prev) => {
      const days = { ...prev.days };
      days[activeDay] = days[activeDay].map((ex) =>
        ex.id === updatedEx.id ? updatedEx : ex
      );
      return { ...prev, days };
    });
    setActiveExercise(null);
  };

  const updateDay = (dayName, updater) => {
    setPlan((prev) => {
      const days = { ...prev.days };
      const current = Array.isArray(days[dayName]) ? days[dayName] : [];
      days[dayName] =
        typeof updater === "function" ? updater(current) : updater;
      return { ...prev, days };
    });
  };

  // Show Calendar function

  const handleSavePlan = async () => {
    if (!userId || !plan) return;
    const planRef = ref(database, `users/${userId}/workoutplan`);
    try {
      await set(planRef, plan);
      Alert.alert("Tallennettu", "Muutokset on tallennettu.");
    } catch (err) {
      console.error(err);
      Alert.alert("Virhe", "Tallennus epäonnistui.");
    }
  };

  const handleDeleteWorkoutPlan = () => {
    Alert.alert(
      "Varmistus",
      "Haluatko poistaa treeniohjelman?",
      [
        {
          text: "Ei",
          style: "cancel",
        },
        {
          text: "Ok",
          style: "destructive",
          onPress: async () => {
            if (!userId) return;
            const planRef = ref(database, `users/${userId}/workoutplan`);
            try {
              await set(planRef, null);
              setPlan(null);
              Alert.alert("Poistettu", "Treeniohjelma on poistettu.");
            } catch (err) {
              console.error(err);
              Alert.alert("Virhe", "Poisto epäonnistui.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (authLoading || loadingPlan || loadingExercises) {
    return (
      <View style={componentStyles.mainContainer}>
        <TextThemed style={textStyles.titleLargeB}>Loading...</TextThemed>
      </View>
    );
  }

  if (!plan) {
    if (isCreating) {
      return (
        <View style={componentStyles.mainContainer}>
          <CreatePlanForm />
        </View>
      );
    }
    return (
      <View style={componentStyles.mainContainer}>
        <TextThemed style={textStyles.titleLargeB}>
          Luo treeniohjelma!
        </TextThemed>
        <ButtonComponent
          content="Luo treeniohjelma"
          onPress={() => setIsCreating(true)}
        />
      </View>
    );
  }

  return (
    <View style={screensStyles.workoutPlanView}>
     {/*
        <Calendar
          markedDates={marked}
          style={componentStyles.calendar}
          theme={componentStyles.calendartheme}
          enableSwipeMonths={true}
          hideArrows={true}
        />
     */}
      <ScrollView
        contentContainerStyle={componentStyles.scrollView}
        nestedScrollEnabled={true}
      >
        <WorkoutPlan
          days={plan.days}
          exerciseData={exerciseData}
          nestedScrollEnabled={true}
          onEditExercise={(ex, day) => {
            setActiveExercise(ex);
            setActiveDay(day);
          }}
          onUpdateExercises={updateDay}
        />
      </ScrollView>
      <ButtonComponent
        content="Poista Ohjelma"
        onPress={handleDeleteWorkoutPlan}
        button="float"
        type="danger"
      />
      <EditExerciseModal
        visible={!!activeExercise}
        exercise={activeExercise}
        onSave={handleSaveExercise}
        onCancel={() => setActiveExercise(null)}
      />
    </View>
  );
}
