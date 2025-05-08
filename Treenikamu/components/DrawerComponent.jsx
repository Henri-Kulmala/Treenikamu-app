import { View, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedText from "./TextThemed";
import MainTheme from "../styles/mainTheme";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import SelectButton from "./SelectButton";
import ButtonComponent from "./ButtonComponent";
import ListItem from "./ListItem";
import Alert from "./AlertComponent";

export default function DrawerComponent({
  title = "teksti",
  isOpen,
  isClosed,
  onPressOffModal,
  children,
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
              <View style={componentStyles.drawerHeader}>
                <ThemedText style={textStyles.titleLargeB}>{title}</ThemedText>
              </View>
              <View style={componentStyles.linkList}>
                  {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}


// <ListItem icon="list" textContent="Liikkeet" iconType="custom" iconColor={MainTheme.colors.text}  />
// <ListItem icon="trash" textContent="Poista ohjelma" iconType="custom" iconColor={MainTheme.colors.highlightDanger} action={onDelete}/> 