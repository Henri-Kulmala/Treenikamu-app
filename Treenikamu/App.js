import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from "./configuration/firebaseConfig";
import AppStack from './screens/AppStack';
import AuthStack from './screens/AuthStack';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Manrope-R': require('./assets/fonts/manrope-regular.otf'),
    'Manrope-B': require('./assets/fonts/manrope-bold.otf'),
    'Manrope-L': require('./assets/fonts/manrope-light.otf'),
    'Manrope-EB': require('./assets/fonts/manrope-extrabold.otf'),
  });

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (fontsLoaded && !initializing) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, initializing]);

  if (!fontsLoaded || initializing) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
