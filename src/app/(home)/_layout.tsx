import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Vagas from './vagas';
import Anhembi from './Anhembi';
import Morumbi from './Morumbi';
import Reservas from './reservas';
import ProfileScreen from './perfil';
import DetailsScreen from './[id]';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Vagas} />
      <Drawer.Screen name="Reservas" component={Reservas} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function HomeDrawer() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerScreens} options={{ headerShown: false }} />
      <Stack.Screen name="Anhembi" component={Anhembi} />
      <Stack.Screen name="Morumbi" component={Morumbi} />
      <Stack.Screen name="[id]" component={DetailsScreen} />
    </Stack.Navigator>
  );
}