// File: components/workoutplan/WorkoutPlanWrapper.jsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import useCurrentUser from "../../configuration/useCurrentUser";
import { ref, get, set } from "firebase/database";
import { database } from "../../configuration/firebaseConfig";
import WorkoutPlan from "./WorkoutPlan";
import EditExerciseModal from "./EditExerciseModal";
import SavePlanButton from "./SavePlanButton";
import CreatePlanForm from "./CreatePlanForm";
import componentStyles from "../../styles/componentStyles";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import ButtonComponent from "../ButtonComponent";

export default function WorkoutPlanWrapper() {
  const { userId, loading: authLoading } = useCurrentUser();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [isCreating, setIsCreating] = useState(false);


  useEffect(() => {
    if (authLoading || !userId) return;
    const planRef = ref(database, `users/${userId}/workoutplan`);
    get(planRef)
      .then((snap) => {
        if (snap.exists()) setPlan(snap.val());
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Virhe", "Treeniohjelman lataus epäonnistui");
      })
      .finally(() => setLoading(false));
  }, [authLoading, userId]);


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
      days[dayName] = typeof updater === "function" ? updater(current) : updater;
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


  if (authLoading || loading) {
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
    <View style={componentStyles.mainContainer}>
      <View style={componentStyles.buttonWrapper}>
        <SavePlanButton onPress={handleSavePlan} />
        <ButtonComponent
          type="danger"
          content="Poista"
          onPress={handleDeleteWorkoutPlan}
        />
      </View>

      <ScrollView contentContainerStyle={componentStyles.scrollView}>
        <WorkoutPlan
          days={plan.days}
          exerciseData={plan.exerciseData}
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
