import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import textStyles from '../styles/textStyles'
import ThemedText from './TextThemed'
import MainTheme from '../styles/mainTheme'
import componentStyles from '../styles/componentStyles'
import SelectButton from './SelectButton'

export default function ListItem({textContent, action, icon = "list", onLong, iconType, iconColor}) {
  return (
    <TouchableOpacity onPress={action} onLongPress={onLong} style={componentStyles.drawerItem}>
        <SelectButton iconName={icon} iconSize={24} type='icon' iconType={iconType} iconColor={iconColor} disabled/>
        <ThemedText style={textStyles.bodyLargeB}>{textContent}</ThemedText>
    </TouchableOpacity>
  )
}