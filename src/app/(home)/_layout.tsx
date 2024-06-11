import React from 'react';
import { Stack } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Entrar from "../(autenticar)/entrar";
import Cadastrar from "../(autenticar)/cadastrar";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';
 
const Drawer = createDrawerNavigator();

  export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
  } from 'expo-router';
  
  // Prevent the splash screen from auto-hiding before asset loading is complete.
  SplashScreen.preventAutoHideAsync();
  
  export default function RootLayout() {
    const [loaded, error] = useFonts({
      SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
      ...FontAwesome.font,
    });
  
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
      if (error) throw error;
    }, [error]);
  
    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    }
  
    return <RootLayoutNav />;
  }
  
  function RootLayoutNav() {
    const colorScheme = useColorScheme();
  
    return (
      <Drawer.Navigator>
      <Drawer.Screen name="Entrar" component={Entrar} />
      <Drawer.Screen name="Cadastrar" component={Cadastrar} />
    </Drawer.Navigator>
    );
  }

  
  
  
  
  
