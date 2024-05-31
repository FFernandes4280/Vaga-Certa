import React from 'react';
import { NavigationContainer } from '@expo-router/native';
import { DrawerNavigator } from '@expo-router/drawer';
import { Stack } from '@expo-router/stack';
import Perfil from './front/perfil'; // Create a ProfileScreen component
import Home from './front/home'; // Replace with actual path
import Vagas from './front/vagas'; // Replace with actual path
import Reservas from './front/reservas'; // Replace with actual path

const Drawer = () => {
  return (
    <DrawerNavigator>
      <Stack.Screen options={{ headerShown: false }}>
        <Stack.Screen name="PERFIL" component={Perfil} />
      </Stack.Screen>
      <Stack.Screen name="HOME" component={Home} />
      <Stack.Screen name="VAGAS" component={Vagas} />
      <Stack.Screen name="RESERVAS" component={Reservas} />
    </DrawerNavigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
};

export default App;