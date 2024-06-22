import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Vagas from './vagas';
import InfoVaga from './info';
import ProfileScreen from './perfil';
import Reservas from './reservas';
import { RootStackParamList } from '../../types';

const Drawer = createDrawerNavigator<RootStackParamList>();

const AuthLayout: React.FC = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Vagas} />
        <Drawer.Screen name="Info" component={InfoVaga} />
        <Drawer.Screen name="Reservas" component={Reservas} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
      </Drawer.Navigator>
  );
};

export default AuthLayout;
