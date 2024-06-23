import { ActivityIndicator, Button, View, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { Link, Redirect } from 'expo-router';
import { supabase } from '../lib/supabase';

const App = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/entrar" />;
  }

  return (
    <View style={styles.container}>
      <Link href="/vagas" asChild>
        <Button title="Home" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} title="Sair" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

export default App;
