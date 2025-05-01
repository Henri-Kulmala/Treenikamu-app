import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import MainTheme from "../styles/mainTheme";
import TextThemed from "./TextThemed";
import ButtonComponent from "./ButtonComponent";

export default function SplitItem({
  name,
  description,
  type,
  onPress,
  ...props
}) {
  // Tähän avausmekaniikka ja laajennus ( row to column vice versa )

  const getCardStyle = () => {
    switch (type) {
      case "open":
        return componentStyles.splitItemOpen;
      default:
        return componentStyles.splitItemClosed;
    }
  };

  // Nimi
  // Kuva ?
  // Selite (infonappi?)
  // animaation kun valittuna?
  // Muuttujana nimi, kuvaus ja kuvan osoite
  // Swaippaa infon näkemiselle? Swipeable

  return (
    <TouchableOpacity
      style={[componentStyles.splitItemOpen, getCardStyle()]}
      onPress={onPress}
    >
      <TextThemed style={textStyles.titleSmallB}>{name}</TextThemed>
      <TextThemed style={textStyles.bodySmall}>{description}</TextThemed>
    </TouchableOpacity>
  );
}
