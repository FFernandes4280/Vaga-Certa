import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Vagas from './vagas';

const Drawer = createDrawerNavigator();

export default function AuthLayout() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Vagas}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
