// File: components/workoutplan/EditExerciseModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputFieldComponent from "../InputFieldComponent";
import ButtonComponent from "../ButtonComponent";
import componentStyles from "../../styles/componentStyles";
import TextThemed from "../TextThemed";
import textStyles from "../../styles/textStyles";
import InstructionsFrame from "../InstructionsFrame";

export default function EditExerciseModal({
  visible,
  exercise,
  onSave,
  onCancel,
}) {
  const [draft, setDraft] = useState(exercise || {});

  useEffect(() => {
    if (visible && exercise) {
      setDraft({ ...exercise });
    }
  }, [visible, exercise]);

  if (!visible) return null;

  return (
    <Modal visible={true} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={componentStyles.editExerciseModalContainer}> 
          <ScrollView contentContainerStyle={componentStyles.modalContainer}>
            <View style={componentStyles.modalImageWrapper}>
              {draft.imgurl ? (
                <Image
                  source={{ uri: draft.imgurl }}
                  style={componentStyles.modalImage}
                />
              ) : null}
            </View>

            <TextThemed style={textStyles.titleLargeBDark}>
              {draft.name || ""}
            </TextThemed>

            <InstructionsFrame
              content={draft.startingPosition}
              header="Alkuasento"
            />
            <InstructionsFrame content={draft.execution} header="Toteutus" />
            <InstructionsFrame content={draft.tips} header="Vinkit" />

            <View style={componentStyles.editExerciseInputContainer}>
              <InputFieldComponent
                styleType="dark"
                header="Sarjat"
                inputStyle="number"
                value={String(draft.sets || "")}
                onChangeText={(t) =>
                  setDraft((prev) => ({ ...prev, sets: Number(t) }))
                }
              />
              <InputFieldComponent
                styleType="dark"
                header="Toistot"
                inputStyle="number"
                value={String(draft.reps || "")}
                onChangeText={(t) =>
                  setDraft((prev) => ({ ...prev, reps: Number(t) }))
                }
              />
              <InputFieldComponent
                styleType="dark"
                header="Paino (kg)"
                inputStyle="number"
                step={2.5}
                value={String(draft.weight || "")}
                onChangeText={(t) =>
                  setDraft((prev) => ({ ...prev, weight: Number(t) }))
                }
              />
            </View>

            <View style={componentStyles.buttonWrapper}>
              <ButtonComponent
                content="Tallenna"
                onPress={() => onSave(draft)}
              />
              <ButtonComponent
                content="Peruuta"
                type="danger"
                onPress={onCancel}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
