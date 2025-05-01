import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { fetchAllExercises } from "../../configuration/fetchExercises";
import WorkoutDaySection from "./WorkoutDaySection";
import componentStyles from "../../styles/componentStyles";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import ButtonComponent from "../ButtonComponent";
import MainTheme from "../../styles/mainTheme";
import StepControls from "../StepControls";
import useCurrentUser from "../../configuration/useCurrentUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, set } from "firebase/database";
import { database } from "../../configuration/firebaseConfig";
import { Alert } from "react-native";
import EditExerciseModal from "./EditExerciseModal";
import { useNavigation } from "@react-navigation/native";

const SPLIT_TEMPLATES = {
  1: {
    "Selkä ja hauikset": [
      { group: "selkä", keys: ["leuanveto", "leveä_taljaveto"] },
      { group: "hauikset", keys: ["hauiskääntö_ez_tangolla"] },
    ],
    "Rinta ja ojentajat": [
      { group: "rinta", keys: ["penkkipunnerrus_tangolla"] },
      { group: "ojentajat", keys: ["dippi"] },
    ],
    Jalat: [{ group: "jalat", keys: ["kyykky"] }],
  },
};

const GeneratedPlanStep = ({ selectedSplit, selectedDays, repeatWeeks }) => {
  const { userId, loading: authLoading } = useCurrentUser();
  const [exerciseData, setExerciseData] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchAllExercises();
      setExerciseData(data);
      setLoading(false);
    };

    loadExercises();
  }, []);

  useEffect(() => {
    if (!exerciseData) return;
    const split = SPLIT_TEMPLATES[selectedSplit];
    const plan = {};

    for (const [dayName, groups] of Object.entries(split)) {
      const allExercises = [];

      groups.forEach(({ group, keys }) => {
        keys.forEach((key, i) => {
          const base = exerciseData?.[group]?.[key];
          if (base) {
            allExercises.push({
              ...base,
              id: `${group}-${key}-${i}`,
              reps: base.reps || 10,
              sets: base.sets || 3,
              weight: base.weight || 0,
            });
          }
        });
      });

      plan[dayName] = allExercises;
    }

    setWorkoutPlan(plan);
  }, [exerciseData, selectedSplit]);

  const handleUpdateExercise = (dayName, updatedExercise) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [dayName]: prev[dayName].map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      ),
    }));
    setActiveExercise(null);
  };

  const handleSaveProgram = async () => {
    if (!userId) return;

    const payload = {
      split: selectedSplit,
      days: workoutPlan,
      selectedDays,
      repeatWeeks,
      savedAt: Date.now(),
    };

    try {
      await set(ref(database, `users/${userId}/workoutplan`), payload);
      Alert.alert("Tallennettu", "Treeniohjelmasi on tallennettu.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Workout"),
        },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert("Virhe", "Treeniohjelman tallennus epäonnistui.");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="gray" />;
  if (!workoutPlan)
    return <TextThemed style={textStyles.bodyLarge}>No exercises</TextThemed>;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={componentStyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(workoutPlan).map(([day, exercises]) => (
            <WorkoutDaySection
              key={day}
              dayName={day}
              exercises={exercises}
              onEditExercise={setActiveExercise}
              setExercises={(updater) =>
                setWorkoutPlan((prev) => {
                  const prevExercises = Array.isArray(prev[day])
                    ? prev[day]
                    : [];
                  const updated =
                    typeof updater === "function"
                      ? updater(prevExercises)
                      : updater;
                  return {
                    ...prev,
                    [day]: updated,
                  };
                })
              }
              exerciseData={exerciseData}
            />
          ))}
        </ScrollView>

        <ButtonComponent 
          content="Tallenna ohjelma"
          onPress={handleSaveProgram}
          button="float"

        />

        <EditExerciseModal
          visible={!!activeExercise}
          exercise={activeExercise}
          onSave={(updated) => handleUpdateExercise(updated.dayName, updated)}
          onCancel={() => setActiveExercise(null)}
        />
      </SafeAreaView>
    </>
  );
};

export default GeneratedPlanStep;
