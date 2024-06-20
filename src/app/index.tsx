import { ActivityIndicator, Button, View } from 'react-native';
import { useAuth } from "../providers/AuthProvider";

import { Link, Redirect } from 'expo-router';
import { supabase } from '../lib/supabase';

const App = () => {
  const { session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/entrar'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/vagas'} asChild>
        <Button title="Home" />
      </Link>
      
      <Button onPress={() => supabase.auth.signOut()} title="Sair" />
    </View>
  );
};

export default App;
