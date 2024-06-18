import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '../../lib/supabase';

const Entrar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (data) {
      setIsLoggedIn(true); // Atualize o estado para indicar sucesso no login
    }
    setLoading(false);
  }

  // Renderização condicional baseada no estado de login
  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Link href='/vagas' /> // Redireciona para a página 'vagas'
      ) : (
        <>
          <Stack.Screen options={{ title: 'Bem vindo' }} />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Entre seu email"
            style={styles.input}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Entre sua senha"
            style={styles.input}
            secureTextEntry
          />

          <Button
            onPress={signInWithEmail}
            disabled={loading}
            text={loading ? 'Carregando...' : 'Entrar'}
          />
          <Link href={'/cadastrar'} style={styles.textButton}>
            Crie uma conta
          </Link>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default Entrar;
