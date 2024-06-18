import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from "../providers/AuthProvider";

import Entrar from './(autenticar)/entrar';
import Vagas from './(home)/vagas';
import Mapa from './(home)/mapa';
import InfoVaga from './(home)/info';
import Reservas from './(home)/reservas';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session ? (
          <Stack.Screen name="Entrar" component={Entrar} />
        ) : (
          <>
            <Stack.Screen name="Vagas" component={Vagas} />
            <Stack.Screen name="Mapa" component={Mapa} />
            <Stack.Screen name="Info" component={InfoVaga} />
            <Stack.Screen name="Reservas" component={Reservas} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
