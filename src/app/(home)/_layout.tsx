import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Vagas from './vagas';
import ProfileScreen from './perfil';
import Reservas from './reservas';
import Anhembi from './Anhembi';
import Morumbi from './Morumbi';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
<Drawer.Navigator>
  <Drawer.Screen name="Home" component={Vagas} />
  <Drawer.Screen name="Anhembi" component={Anhembi} options={{ drawerItemStyle: { display: 'none' } }}/> 
  <Drawer.Screen name="Morumbi" component={Morumbi} options={{ drawerItemStyle: { display: 'none' } }}/>
  {/* <Drawer.Screen name="Info" component={InfoVaga} options={{ drawerItemStyle: { display: 'none' } }}/> */}
  <Drawer.Screen name="Reservas" component={Reservas} />
  <Drawer.Screen name="Perfil" component={ProfileScreen} />
</Drawer.Navigator>
) 
}

// import React from 'react';
// import TestInfoVaga from './TestInfoVaga';

// const App: React.FC = () => {
//   return <TestInfoVaga />;
// };

// export default App;
