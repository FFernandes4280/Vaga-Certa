import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Vagas from './vagas';
import InfoVaga from './info';
import Mapa from './mapa';
import ProfileScreen from './perfil';
import Reservas from './reservas';

const Drawer = createDrawerNavigator();

export default function AuthLayout() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Vagas}/>
        <Drawer.Screen name='Info' component={InfoVaga}/>
        <Drawer.Screen name='Mapa' component={Mapa}/>
        <Drawer.Screen name='Reservas' component={Reservas}/>
        <Drawer.Screen name='Perfil' component={ProfileScreen}/>
      </Drawer.Navigator>
  )
}
