// File: components/workoutplan/WorkoutPlanWrapper.jsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import useCurrentUser from "../configuration/useCurrentUser";
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

export default function WorkoutPlanView() {
  const { userId, loading: authLoading } = useCurrentUser();
  const [plan, setPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [exerciseData, setExerciseData] = useState(null);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [activeExercise, setActiveExercise] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [isCreating, setIsCreating] = useState(null);

  useEffect(() => {
    if (authLoading || !userId) return;

    setLoadingPlan(true);
    get(ref(database, `users/${userId}/workoutplan`))
      .then((snap) => snap.exists() && setPlan(snap.val()))
      .catch((err) => {
        console.error(err);
        Alert.alert("Virhe", "Treeniohjelman lataus epäonnistui");
      })
      .finally(() => setLoadingPlan(false));
  }, [authLoading, userId]);

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

  const handleDeleteWorkoutPlan = async () => {
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
      <View>
        <StepControls
          onSave={handleSavePlan}
          onDelete={handleDeleteWorkoutPlan}
          deleteStyle="danger"
          saveStyle="enabled"
          nextStyle="null"
          backStyle="null"
        />
      </View>

      <ScrollView contentContainerStyle={componentStyles.scrollView}>
        <WorkoutPlan
          days={plan.days}
          exerciseData={exerciseData}
          onEditExercise={(ex, day) => {
            setActiveExercise(ex);
            setActiveDay(day);
          }}
          onUpdateExercises={updateDay}
        />
      </ScrollView>

      <EditExerciseModal
        visible={!!activeExercise}
        exercise={activeExercise}
        onSave={handleSaveExercise}
        onCancel={() => setActiveExercise(null)}
      />
    </View>
  );
}
