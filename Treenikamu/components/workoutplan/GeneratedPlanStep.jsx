import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { fetchAllExercises } from "../../configuration/fetchExercises";
import WorkoutDaySection from "./WorkoutDaySection";
import componentStyles from "../../styles/componentStyles";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import InputFieldComponent from "../InputFieldComponent";
import ButtonComponent from "../ButtonComponent";
import InstructionsFrame from "../InstructionsFrame";
import StepControls from "../StepControls";


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

const GeneratedPlanStep = ({ selectedSplit }) => {
  const [exerciseData, setExerciseData] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState(null);

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

  if (loading) return <ActivityIndicator size="large" color="gray" />;
  if (!workoutPlan)
    return <TextThemed style={textStyles.bodyLarge}>No exercises</TextThemed>;

  return (
    <>
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
                const prevExercises = Array.isArray(prev[day]) ? prev[day] : [];
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

      <Modal visible={!!activeExercise} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <ScrollView contentContainerStyle={componentStyles.modalContainer}>
              {activeExercise && (
                <>
                  <View style={{ marginBottom: 24, gap: 8 }}>
                    <TextThemed style={textStyles.titleLargeBDark}>
                      {activeExercise.name}
                    </TextThemed>
                    <InstructionsFrame
                      content={activeExercise.startingPosition}
                      header="Alkuasento"
                    />
                    <InstructionsFrame
                      content={activeExercise.execution}
                      header="Toteutus"
                    />
                    <InstructionsFrame
                      content={activeExercise.tips}
                      header="Vinkit"
                    />
                  </View>
                  <View style={componentStyles.editExerciseInputContainer}>

                    <InputFieldComponent
                      styleType="dark"
                      header="sarjat"
                      keyboardType="numeric"
                      inputStyle="number"
                      value={String(activeExercise.sets)}
                      onChangeText={(text) =>
                        setActiveExercise({
                          ...activeExercise,
                          sets: Number(text),
                        })
                      }
                      style={{ marginVertical: 6, borderBottomWidth: 1 }}
                    />
                    <InputFieldComponent
                      styleType="dark"
                      header="toistot"
                      keyboardType="numeric"
                      inputStyle="number"
                      value={String(activeExercise.reps)}
                      onChangeText={(text) =>
                        setActiveExercise({
                          ...activeExercise,
                          reps: Number(text),
                        })
                      }
                      style={{ marginVertical: 6, borderBottomWidth: 1 }}
                    />
                    
                    <InputFieldComponent
                      styleType="dark"
                      header="paino (kg)"
                      keyboardType="numeric"
                      inputStyle="number"
                      step={2.5}
                      value={String(activeExercise.weight)}
                      onChangeText={(text) =>
                        setActiveExercise({
                          ...activeExercise,
                          weight: Number(text),
                        })
                      }
                      style={{ marginVertical: 6, borderBottomWidth: 1 }}
                    />
                  </View>

                  <View style={componentStyles.buttonWrapper}>
                    <ButtonComponent
                      content="tallenna"
                      onPress={() =>
                        handleUpdateExercise(
                          activeExercise.dayName,
                          activeExercise
                        )
                      }
                    />
                    <View style={{ height: 12 }} />
                    <ButtonComponent
                      content="poistu"
                      type="danger"
                      onPress={() => setActiveExercise(null)}
                    />
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default GeneratedPlanStep;
