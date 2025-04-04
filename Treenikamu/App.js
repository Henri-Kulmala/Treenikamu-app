import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './screens/LoginView';
import RegisterView from './screens/RegisterView';
import componentStyles from './constants/componentStyles';
import LandingView from './screens/LandingView';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = Font.useFonts({
    'Manrope-R': require('./assets/fonts/manrope-regular.otf'),
    'Manrope-B': require('./assets/fonts/manrope-bold.otf'),
    'Manrope-L': require('./assets/fonts/manrope-light.otf'),
    'Manrope-EB': require('./assets/fonts/manrope-extrabold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;


  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Register" component={RegisterView} />
        <Stack.Screen name="Landing" component={LandingView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
