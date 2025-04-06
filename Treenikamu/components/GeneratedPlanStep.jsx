import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
  ScrollView,KeyboardAvoidingView, Platform
} from "react-native";
import { fetchAllExercises } from "../configuration/fetchExercises";
import WorkoutDaySection from "./WorkoutDaySection";

const SPLIT_TEMPLATES = {
    1: {
      "Selkä ja hauikset": [
        { group: "selkä", keys: ["leuanveto", "leveä_taljaveto"] },
        { group: "hauikset", keys: ["hauiskääntö_ez_tanko"] }
      ],
      "Rinta ja ojentajat": [
        { group: "rinta", keys: ["penkkipunnerrus_tangolla"] },
        { group: "ojentajat", keys: ["dippi"] }
      ],
      Jalat: [
        { group: "jalat", keys: ["kyykky"] }
      ]
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
  if (!workoutPlan) return <Text>No exercises</Text>;

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }}
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
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 20,
        }}
      >
        {activeExercise && (
          <>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
              {activeExercise.name}
            </Text>
            <Text>{activeExercise.startingPosition}</Text>
            <Text>{activeExercise.execution}</Text>
            <Text>{activeExercise.tips}</Text>

            <TextInput
              placeholder="Sets"
              keyboardType="numeric"
              value={String(activeExercise.sets)}
              onChangeText={(text) =>
                setActiveExercise({ ...activeExercise, sets: Number(text) })
              }
              style={{ marginVertical: 6, borderBottomWidth: 1 }}
            />
            <TextInput
              placeholder="Reps"
              keyboardType="numeric"
              value={String(activeExercise.reps)}
              onChangeText={(text) =>
                setActiveExercise({ ...activeExercise, reps: Number(text) })
              }
              style={{ marginVertical: 6, borderBottomWidth: 1 }}
            />
            <TextInput
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={String(activeExercise.weight)}
              onChangeText={(text) =>
                setActiveExercise({ ...activeExercise, weight: Number(text) })
              }
              style={{ marginVertical: 6, borderBottomWidth: 1 }}
            />

            <Button
              title="Save"
              onPress={() =>
                handleUpdateExercise(activeExercise.dayName, activeExercise)
              }
            />
            <View style={{ height: 12 }} />
            <Button title="Cancel" onPress={() => setActiveExercise(null)} />
          </>
        )}
      </ScrollView>
    </View>
  </KeyboardAvoidingView>
</Modal>

    </>
  );
}
  

export default GeneratedPlanStep;
