import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Modal, TextInput, Button } from 'react-native';
import { fetchAllExercises } from '../configuration/fetchExercises';
import WorkoutDaySection from './WorkoutDaySection';

const SPLIT_TEMPLATES = {
  1: {
    'Selkä ja hauikset': { group: 'selkä', keys: ['leuanveto', 'leveä_taljaveto'] },
    'Rinta ja ojentajat': { group: 'rinta', keys: ['penkkipunnerrus_tangolla'] },
    'Jalat': { group: 'jalat', keys: ['kyykky'] }
  },
  // Add #2 and #3 if needed
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

    for (const [dayName, { group, keys }] of Object.entries(split)) {
      plan[dayName] = keys.map((key, i) => {
        const base = exerciseData?.[group]?.[key];
        return base
          ? { ...base, id: `${group}-${key}-${i}`, reps: base.reps || 10, sets: base.sets || 3, weight: base.weight || 0 }
          : null;
      }).filter(Boolean);
    }

    setWorkoutPlan(plan);
  }, [exerciseData, selectedSplit]);

  const handleUpdateExercise = (dayName, updatedExercise) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [dayName]: prev[dayName].map(ex => ex.id === updatedExercise.id ? updatedExercise : ex)
    }));
    setActiveExercise(null);
  };

  if (loading) return <ActivityIndicator size="large" color="gray" />;
  if (!workoutPlan) return <Text>No exercises</Text>;

  return (
    <View>
      {Object.entries(workoutPlan).map(([day, exercises]) => (
        <WorkoutDaySection
          key={day}
          dayName={day}
          exercises={exercises}
          onEditExercise={setActiveExercise}
          setExercises={(updated) =>
            setWorkoutPlan(prev => ({ ...prev, [day]: updated }))
          }
        />
      ))}

      <Modal visible={!!activeExercise} transparent animationType="slide">
        {activeExercise && (
          <View style={{ backgroundColor: '#fff', padding: 20, margin: 40, borderRadius: 12 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{activeExercise.name}</Text>
            <Text>{activeExercise.startingPosition}</Text>
            <Text>{activeExercise.execution}</Text>
            <Text>{activeExercise.tips}</Text>

            <TextInput
              placeholder="Sets"
              keyboardType="numeric"
              value={String(activeExercise.sets)}
              onChangeText={(text) => setActiveExercise({ ...activeExercise, sets: Number(text) })}
            />
            <TextInput
              placeholder="Reps"
              keyboardType="numeric"
              value={String(activeExercise.reps)}
              onChangeText={(text) => setActiveExercise({ ...activeExercise, reps: Number(text) })}
            />
            <TextInput
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={String(activeExercise.weight)}
              onChangeText={(text) => setActiveExercise({ ...activeExercise, weight: Number(text) })}
            />
            <Button title="Save" onPress={() => handleUpdateExercise(activeExercise.dayName, activeExercise)} />
            <Button title="Cancel" onPress={() => setActiveExercise(null)} />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default GeneratedPlanStep;
