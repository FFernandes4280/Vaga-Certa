<<<<<<< Updated upstream
import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Vagas from './vagas';
import InfoVaga from './info';
import Mapa from './mapa';
import ProfileScreen from './perfil';
import Reservas from './reservas';
import { RootStackParamList } from '../../types';

const Drawer = createDrawerNavigator<RootStackParamList>();

const AuthLayout: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Vagas} />
        <Drawer.Screen name="Info" component={InfoVaga} />
        <Drawer.Screen name="Mapa" component={Mapa} />
        <Drawer.Screen name="Reservas" component={Reservas} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthLayout;
=======
import React from 'react';
import TestInfoVaga from './TestInfoVaga';

const App: React.FC = () => {
  return <TestInfoVaga />;
};

export default App;
>>>>>>> Stashed changes
