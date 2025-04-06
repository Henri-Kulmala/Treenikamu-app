import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import TextThemed from "../components/TextThemed";
import textStyles from "../styles/textStyles";
import componentStyles from '../styles/componentStyles';


export default function CheckHeader({ title, isOpen, completed, toggleOpen }) {
  return (
    <TouchableOpacity
    onPress={toggleOpen}
    style={[componentStyles.header, { opacity: isOpen ? 1 : 0.4 }]}
  >
    <TextThemed style={textStyles.sliderLabel}>{title}</TextThemed>
    <Ionicons
      name={completed ? "checkmark-circle" : "close-circle"}
      size={24}
      color={completed ? "green" : "red"}
      style={{ marginLeft: 10 }}
    />
  </TouchableOpacity>
  )
}