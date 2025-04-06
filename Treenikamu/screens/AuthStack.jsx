import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
    </Stack.Navigator>
  );
}
