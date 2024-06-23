import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InfoVaga from './info';

const Stack = createStackNavigator();

const TestInfoVaga: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="InfoVaga">
        <Stack.Screen name="Informações" component={InfoVaga} initialParams={{ id: 7 }} />
      </Stack.Navigator>
  );
};

export default TestInfoVaga;