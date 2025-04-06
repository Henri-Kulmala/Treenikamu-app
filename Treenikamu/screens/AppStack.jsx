import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingView from './LandingView';


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingView} />
    </Stack.Navigator>
  );
}
