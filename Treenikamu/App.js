import { View } from 'react-native';
import  LoginView  from './screens/LoginView'; 
import componentStyles from './constants/componentStyles';
import screensStyles from './constants/screensStyles';

export default function App() {
  return (
    <View style={componentStyles.mainContainer}>
      <LoginView />
    </View>
  );
}



