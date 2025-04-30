import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import WorkoutSplitStep from "./WorkoutSplitStep";
import WorkoutDaysStep from "./WorkoutDayStep";
import GeneratedPlanStep from "./GeneratedPlanStep";
import StepControls from "../StepControls";
import componentStyles from "../../styles/componentStyles";

const CreatePlanForm = ({ handleSave }) => {
  const [step, setStep] = useState(1);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [repeatWeeks, setRepeatWeeks] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <View style={componentStyles.formContainer}>
      {step === 1 && (
        <View>
          <StepControls
            onBack={handleBack}
            onNext={handleNext}
            nextStyle="enabled"
            deleteStyle="null"
            saveStyle="null"
          />
          <WorkoutSplitStep
            selectedSplit={selectedSplit}
            onSelectSplit={setSelectedSplit}
          />
        </View>
      )}
      {step === 2 && (
        <View>
          <StepControls
            onBack={handleBack}
            onNext={handleNext}
            nextStyle="enabled"
            deleteStyle="null"
            saveStyle="null"
          />
          <WorkoutDaysStep
            selectedDays={selectedDays}
            repeatWeeks={repeatWeeks}
            onChangeDays={setSelectedDays}
            onChangeRepeatWeeks={setRepeatWeeks}
          />
        </View>
      )}
      {step === 3 && (
        <View style={componentStyles.formContainer}>
          <StepControls
            onBack={handleBack}
            handleSave={handleSave}
            nextStyle="null"
            deleteStyle="null"
            saveStyle="null"
          />
          <GeneratedPlanStep
            selectedSplit={selectedSplit}
            selectedDays={selectedDays}
            repeatWeeks={repeatWeeks}
          />
        </View>
      )}
    </View>
  );
};

export default CreatePlanForm;
