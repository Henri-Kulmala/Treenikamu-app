import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import WorkoutSplitStep from './WorkoutSplitStep';
import WorkoutDaysStep from './WorkoutDayStep';
import GeneratedPlanStep from './GeneratedPlanStep';

const CreatePlanForm = () => {
  const [step, setStep] = useState(1);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleNext = () => setStep(step + 1);

  return (
    <View>
      {step === 1 && (
        <WorkoutSplitStep
          selectedSplit={selectedSplit}
          onSelectSplit={setSelectedSplit}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <WorkoutDaysStep
          selectedDays={selectedDays}
          onChangeDays={setSelectedDays}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <GeneratedPlanStep
          selectedSplit={selectedSplit}
          selectedDays={selectedDays}
        />
      )}
    </View>
  );
};

export default CreatePlanForm;
