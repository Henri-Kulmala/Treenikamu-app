import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../constants/firebaseConfig'; 
import componentStyles from '../constants/componentStyles';
import TextThemed from '../components/TextThemed';
import textStyles from '../constants/textStyles';


const LandingView = () => {

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <View style={componentStyles.mainContainer}>
      <TextThemed style={textStyles.titleLargeB}>Welcome to Treenikamu! 💪</TextThemed>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};



export default LandingView;
