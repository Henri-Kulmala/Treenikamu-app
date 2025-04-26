import React from "react";
import { View } from "react-native";
import componentStyles from "../styles/componentStyles";
import SelectButton from "./SelectButton";

const ALLOWED_STYLES = ["enabled", "disabled", "danger-muted", "danger", "null"];

const StepControls = ({
  onBack,
  onNext,
  onSave,
  onDelete,

  backStyle = "disabled",
  nextStyle = "disabled",
  saveStyle = "disabled",
  deleteStyle = "disabled",
}) => {

  const normalize = (style) =>
    ALLOWED_STYLES.includes(style) ? style : "disabled";

  return (
    <View style={componentStyles.stepContainer}>
      <SelectButton
        onPress={onBack}
        iconName="chevron-back-circle"
        iconSize={40}
        iconType={normalize(backStyle)}
        type="icon"
      />

      <SelectButton
        onPress={onDelete}
        iconName="close-circle"
        iconSize={40}
        iconType={normalize(deleteStyle)}
        type="icon"
      />

      <SelectButton
        onPress={onSave}
        iconName="bookmark"
        iconSize={40}
        iconType={normalize(saveStyle)}
        type="icon"
      />

      <SelectButton
        onPress={onNext}
        iconName="chevron-forward-circle"
        iconSize={40}
        iconType={normalize(nextStyle)}
        type="icon"
      />
    </View>
  );
};

export default StepControls;
