import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import TextThemed from "./TextThemed";
import ButtonComponent from "./ButtonComponent";
import componentStyles from "../styles/componentStyles";
import MainTheme from "../styles/mainTheme";
import textStyles from "../styles/textStyles";

export default function AlertComponent({
  isVisible,
  onRequestClose,

  title,
  message,
  renderContent,
  actions,
  actionStyle,

  animationIn = "zoomIn",
  animationOut = "zoomOut",
  animationInTiming = 300,
  animationOutTiming = 300,

  backdropColor = "rgba(0,0,0,0.5)",
  backdropOpacity = 1.0,
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onRequestClose}
      onBackButtonPress={onRequestClose}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      useNativeDriver
    >
      <View style={componentStyles.modalContainer}>
        <View>
          {title && (
            <TextThemed style={textStyles.titleLargeBDark}>{title}</TextThemed>
          )}
          {message && (
            <TextThemed style={textStyles.bodyLargeBDark}>{message}</TextThemed>
          )}
          {renderContent}
        </View>

        <View style={componentStyles.modalActions}>
          {actions.map(({ text, onPress, actionStyle }, i) => (
            <ButtonComponent
              type={actionStyle}
              key={i}
              content={text}
              onPress={onPress}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
}
