import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import WorkoutSplitStep from "./WorkoutSplitStep";
import WorkoutDaysStep from "./WorkoutDayStep";
import GeneratedPlanStep from "./GeneratedPlanStep";
import StepControls from "../StepControls";
import componentStyles from "../../styles/componentStyles";

const CreatePlanForm = () => {
  const [step, setStep] = useState(1);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <View>
      {step === 1 && (
        <View>
          <StepControls
            onBack={handleBack}
            onNext={handleNext}
            nextContent="Seuraava"
            prevContent="Takaisin"
            nextStyle={componentStyles.buttonContainer}
            prevStyle={componentStyles.buttonContainer}
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
            nextContent="Seuraava"
            prevContent="Takaisin"
            nextStyle={componentStyles.buttonWrapper}
            prevStyle={componentStyles.buttonWrapper}
          />
          <WorkoutDaysStep
            selectedDays={selectedDays}
            onChangeDays={setSelectedDays}
          />
        </View>
      )}
      {step === 3 && (
        <View>
          <StepControls
            onBack={handleBack}
            onNext={handleNext}
            nextContent="Takaisin"
            prevContent="Takaisin"
            nextStyle={componentStyles.buttonWrapper}
            prevStyle={componentStyles.buttonWrapper}
          />
          <GeneratedPlanStep
            selectedSplit={selectedSplit}
            selectedDays={selectedDays}
          />
        </View>
      )}
    </View>
  );
};

export default CreatePlanForm;
