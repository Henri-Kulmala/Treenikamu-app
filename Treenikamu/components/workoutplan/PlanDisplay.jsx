// components/workoutplan/PlanDisplay.jsx
import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import WorkoutDaySection from "./WorkoutDaySection";
import ButtonComponent from "../ButtonComponent";
import EditExerciseModal from "./EditExerciseModal";
import AddExerciseModal from "./AddExerciseModal";
import { useNavigation } from "@react-navigation/native";
import { ref, set } from "firebase/database";
import { database } from "../../configuration/firebaseConfig";
import useCurrentUser from "../../configuration/useCurrentUser";
import componentStyles from "../../styles/componentStyles";
import AlertComponent from "../AlertComponent";
import MainTheme from "../../styles/mainTheme";
import TopBar from "../TopBar";
import DrawerComponent from "../DrawerComponent";
import textStyles from "../../styles/textStyles";
import ListItem from "../ListItem";
import SavePlanButton from "./SavePlanButton";

export default function PlanDisplay({
  days,
  setDays,
  exerciseData,
  repeatWeeks,
  onSaveOverride,
  onEnableDelete,
  showDeleteButton,
}) {
  const { userId, loading: authLoading } = useCurrentUser();
  const navigation = useNavigation();
  const [activeExercise, setActiveExercise] = useState(null);
  const [addModalDay, setAddModalDay] = useState(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const allExercisesList = useMemo(() => {
    if (!exerciseData) return [];
    return Object.values(exerciseData)
      .flatMap((groupMap) => Object.values(groupMap))
      .map((ex) => ({
        ...ex,
        id: ex.id || `${ex.group}-${ex.name}`,
      }));
  }, [exerciseData]);

  if (authLoading || !exerciseData) {
    return (
      <ActivityIndicator size="large" color={MainTheme.colors.highlightGreen} />
    );
  }

  const updateDay = (dayName, updater) =>
    setDays((prev) => ({
      ...prev,
      [dayName]:
        typeof updater === "function" ? updater(prev[dayName]) : updater,
    }));

  const handleSave = async () => {
    if (onSaveOverride) return onSaveOverride();
    if (!userId) return;
    try {
      await set(ref(database, `users/${userId}/workoutplan`), {
        days,
        repeatWeeks,
        savedAt: Date.now(),
      });
      Alert.alert("Tallennettu", "Treeniohjelmasi on tallennettu.", [
        { text: "OK", onPress: () => navigation.navigate("Workout") },
      ]);
    } catch {
      Alert.alert("Virhe", "Tallenus epäonnistui.");
    }
  };

  const handleDelete = async () => {
    clearAlert();
    if (!userId) return;

    try {
      await set(ref(database, `users/${userId}/workoutplan`), null);
      navigation.navigate("Workout");
      onEnableDelete?.();
    } catch {
      setTitle("Virhe");
      setMessage("Treeniohjelman poisto epäonnistui.");
    }
  };

  const clearAlert = () => {
    setTitle(null);
    setMessage(null);
    setAlertVisible(false);
  };

  const confirmDelete = () => {
    setTitle("Huomio");
    setMessage("Haluatko varmasti poistaa treeniohjelman?");
    setAlertVisible(true);
  };

  return (
    <SafeAreaView>
      <AlertComponent
        title={title}
        message={message}
        isVisible={alertVisible}
        onRequestClose={clearAlert}
        actions={[
          { text: "Peruuta", onPress: clearAlert, actionStyle: "danger" },
          { text: "Kyllä", onPress: handleDelete },
        ]}
      />

      {!showDeleteButton && (
        <SavePlanButton
          onPress={handleSave}
        />
      )}
      {showDeleteButton && (
        <View>
          <TopBar rightIconPress={() => setOpenDrawer(true)} />
          <DrawerComponent
            title="Treeni"
            isOpen={openDrawer}
            isClosed={() => setOpenDrawer(false)}
            onPressOffModal={() => setOpenDrawer(false)}>
            <ListItem
              icon="list"
              textContent="Liikkeet"
              iconType="custom"
              iconColor={MainTheme.colors.text}
            />
            <ListItem
              icon="save"
              textContent="Tallenna"
              iconType="custom"
              iconColor={MainTheme.colors.highlightGreen}
              action={handleSave}
            />
            <ListItem
              icon="trash"
              textContent="Poista ohjelma"
              iconType="custom"
              iconColor={MainTheme.colors.highlightDanger}
              action={confirmDelete}
            />
          </DrawerComponent>
        </View>
      )}

      <ScrollView contentContainerStyle={componentStyles.scrollView}>
        {Object.entries(days).map(([dayName, exercises]) => (
          <WorkoutDaySection
            key={dayName}
            dayName={dayName}
            exercises={exercises}
            exerciseData={exerciseData}
            onEditExercise={(ex) => setActiveExercise({ ...ex, dayName })}
            onAddExercise={() => setAddModalDay(dayName)}
            setExercises={(updater) => updateDay(dayName, updater)}
          />
        ))}
      </ScrollView>

      <EditExerciseModal
        visible={!!activeExercise}
        exercise={activeExercise}
        onSave={(updated) => {
          updateDay(updated.dayName, (exs) =>
            exs.map((ex) => (ex.id === updated.id ? updated : ex))
          );
          setActiveExercise(null);
        }}
        onCancel={() => setActiveExercise(null)}
      />

      <AddExerciseModal
        visible={!!addModalDay}
        availableExercises={allExercisesList}
        onAdd={(newEx) => {
          updateDay(addModalDay, (exs) => [
            ...exs,
            { ...newEx, id: `${addModalDay}-${newEx.id}` },
          ]);
          setAddModalDay(null);
        }}
        onClose={() => setAddModalDay(null)}
      />
    </SafeAreaView>
  );
}
