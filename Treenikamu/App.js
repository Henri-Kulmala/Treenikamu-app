import { View } from 'react-native';
import  LoginView  from './screens/LoginView'; 
import componentStyles from './constants/componentStyles';

export default function App() {
  return (
    <View style={componentStyles.mainContainer}>
      <LoginView />
    </View>
  );
}



