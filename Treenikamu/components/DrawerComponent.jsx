import { View, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedText from "./TextThemed";
import MainTheme from "../styles/mainTheme";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import SelectButton from "./SelectButton";
import ButtonComponent from "./ButtonComponent";
import ListItem from "./ListItem";

export default function DrawerComponent({
  onPress,
  title = "teksti",
  isOpen,
  isClosed,
  onPressOffModal,
}) {
  return (
    <Modal
      style={componentStyles.drawerContainer}
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={isClosed}
    >
      <TouchableWithoutFeedback onPress={onPressOffModal}>
        <View style={componentStyles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={componentStyles.drawerItemList}>
              <View>
                <ThemedText style={textStyles.titleLargeBDark}>{title}</ThemedText>
              </View>
              <View style={componentStyles.linkList}>
                <ListItem icon="list" textContent="liikkeet" />
                <ListItem icon="trash" textContent="poista" iconType="danger"/> 
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
