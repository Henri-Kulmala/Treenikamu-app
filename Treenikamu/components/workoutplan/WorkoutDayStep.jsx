import React, { useState, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import componentStyles from "../../styles/componentStyles";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import MainTheme from "../../styles/mainTheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputFieldComponent from "../InputFieldComponent";
import SelectButton from "../SelectButton";

const days = ["MA", "TI", "KE", "TO", "PE", "LA", "SU"];

const WorkoutDayStep = ({
  selectedDays,
  repeatWeeks,
  onChangeDays,
  onChangeRepeatWeeks,
}) => {
  const [showRepeatWeeksInput, setShowRepeatWeeksInput] = useState(true);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onChangeDays(selectedDays.filter((d) => d !== day));
    } else {
      onChangeDays([...selectedDays, day]);
    }
  };

  const handleRepeatWeeksChange = (text) => {
    const weeks = parseInt(text);
    if (!isNaN(weeks)) {
      onChangeRepeatWeeks(weeks);
    }
  };

  const toggleSelectInfinite = () => {
    const isInfinite = repeatWeeks === Infinity;
  
    if (isInfinite) {
      onChangeRepeatWeeks(1);
      setShowRepeatWeeksInput(true);
    } else {
      onChangeRepeatWeeks(Infinity);
      setShowRepeatWeeksInput(false);
    }
  };

  const endDateFormatted = useMemo(() => {
    if (repeatWeeks === Infinity) return "toistaiseksi";
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + repeatWeeks * 7);
    return endDate.toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, [repeatWeeks]);

  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, []);

  return (
    <View style={componentStyles.workoutDayStepWrapper}>
      <View style={componentStyles.titleWithDescription}>
        <TextThemed style={textStyles.titleLargeB}>
          Valitse treenipäivät
        </TextThemed>
        <TextThemed style={textStyles.bodySmall}>
          Valitse treenipäivät, jolloin haluat treenata. Voit valita useita
          päiviä.
        </TextThemed>
      </View>

      <View style={componentStyles.workoutDayStepContainer}>
        {days.map((day) => (
          <SelectButton
            key={day}
            onPress={() => toggleDay(day)}
            type={selectedDays.includes(day) ? "enabled" : "disabled"}
            content={day}
          />
        ))}
      </View>

      <View style={componentStyles.workoutWeekRepeatContainer}>
        <TextThemed style={textStyles.bodyLargeBGreen}>
          Haluatko toistaa treenit viikottain?
        </TextThemed>

        {showRepeatWeeksInput ? (
          <View>
            <View style={componentStyles.selectableWithTitle}>
              <InputFieldComponent
                inputStyle="number"
                value={repeatWeeks}
                onChangeText={handleRepeatWeeksChange}
                header="Viikkojen määrä"
                placeholder="1"
                step={1}
              />

              <TextThemed style={textStyles.bodyLarge}>
                Treenijakso:
                <TextThemed style={textStyles.buttonText}>
                  {todayFormatted} – {endDateFormatted}
                </TextThemed>
              </TextThemed>
            </View>
            <View style={componentStyles.selectableWithTitle}>
              <TextThemed style={textStyles.bodySmall}>
                Tai jatka treenien toistoa, kunnes haluat lopettaa.
              </TextThemed>
              <SelectButton
                onPress={toggleSelectInfinite}
                type="icon"
                iconName="infinite"
                iconType="disabled"
                iconSize={32}
                iconStyle={componentStyles.iconButtonDisabled}
              />
            </View>
          </View>
        ) : (
          <View style={componentStyles.selectableWithTitle}>
            <TextThemed style={textStyles.bodySmall}>
              Tai jatka treenien toistoa, kunnes haluat lopettaa.
            </TextThemed>
            <SelectButton
              onPress={toggleSelectInfinite}
              type="icon"
              iconName="infinite"
              iconSize={32}
              iconType="danger"
              iconStyle={componentStyles.iconButtonEnabled}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default WorkoutDayStep;
