import React, { useState, useEffect } from "react";
import { View } from "react-native";
import StepControls from "../StepControls";
import WorkoutSplitStep from "./WorkoutSplitStep";
import WorkoutDayStep from "./WorkoutDayStep";
import PlanDisplay from "./PlanDisplay";
import { fetchAllExercises } from "../../configuration/fetchExercises";
import componentStyles from "../../styles/componentStyles";

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

export default function CreatePlanForm({
 initialDays = null,
 initialRepeatWeeks = 1,
 onCancel = () => {},

}) {
  const [step, setStep] = useState(1);
  const [split, setSplit] = useState(null);
  const [selectedDays, setSelectedDays] = useState(
  initialDays ? Object.keys(initialDays) : []
);
const [repeatWeeks, setRepeatWeeks] = useState(initialRepeatWeeks);
  const [exerciseData, setExerciseData] = useState(null);
  const [planDays, setPlanDays] = useState({});

  useEffect(() => {
    fetchAllExercises().then(setExerciseData);
  }, []);

  const buildPlan = () => {
    const template = SPLIT_TEMPLATES[split] || {};
    const plan = {};

    Object.entries(template).forEach(([groupTitle, groupDefs]) => {
      const all = [];

      groupDefs.forEach(({ group, keys }) =>
        keys.forEach((key, i) => {
          const base = exerciseData?.[group]?.[key];
          if (!base) return;
          all.push({
            ...base,
            id: `${group}-${key}-${i}`,
            reps: base.reps ?? 10,
            sets: base.sets ?? 3,
            weight: base.weight ?? 0,
          });
        })
      );

      plan[groupTitle] = all;
    });

    return plan;
  };

  const handleToPreview = () => {
    setPlanDays(buildPlan());
    setStep(3);
  };

  return (
    <View style={componentStyles.formContainer}>
      {step === 1 && (
        <>
          <StepControls
            backStyle="null"
            deleteStyle="null"
            saveStyle="null"
            nextStyle="enabled"
            onNext={() => setStep(2)}
          />
          <WorkoutSplitStep selectedSplit={split} onSelectSplit={setSplit} />
        </>
      )}
      {step === 2 && (
        <>
          <StepControls
            onBack={() => setStep(1)}
            deleteStyle="null"
            backStyle="enabled"
            saveStyle="null"
            nextStyle="enabled"
            onNext={handleToPreview}
          />
          <WorkoutDayStep
            selectedDays={selectedDays}
            repeatWeeks={repeatWeeks}
            onChangeDays={setSelectedDays}
            onChangeRepeatWeeks={setRepeatWeeks}
          />
        </>
      )}
      {step === 3 && (
        <>
          <StepControls
            onBack={() => setStep(2)}
            deleteStyle="null"
            nextStyle="null"
            backStyle="enabled"
            saveStyle="null"
          />
          <PlanDisplay
            days={planDays}
            setDays={setPlanDays}
            exerciseData={exerciseData}
            repeatWeeks={repeatWeeks}
          />
        </>
      )}
    </View>
  );
}
