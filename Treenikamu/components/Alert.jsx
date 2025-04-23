import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import TextThemed from './TextThemed';
import ButtonComponent from './ButtonComponent';
import componentStyles from '../styles/componentStyles';
import MainTheme from '../styles/mainTheme';
import textStyles from '../styles/textStyles';


export default function Alert({
  isVisible,
  onRequestClose,
  // content
  title,
  message,
  renderContent,       // optional custom body
  actions,             // array of { text, onPress, style }
  // animation
  animationIn     = 'zoomIn',
  animationOut    = 'zoomOut',
  animationInTiming  = 300,
  animationOutTiming = 300,
  // overlay
  backdropColor   = 'rgba(0,0,0,0.5)',
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
        {title && <TextThemed style={textStyles.titleLargeBDark}>{title}</TextThemed>}
        {message && <TextThemed style={textStyles.bodyLargeBDark}>{message}</TextThemed>}
        {renderContent}
        <View >
          {actions.map(({ text, onPress, style }, i) => (
            <ButtonComponent
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

