import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { CosmosClient } from '@azure/cosmos';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack, useNavigation } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { dotenv } from 'react-native-dotenv';

dotenv.config();

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Utilize useNavigation hook

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    // Save login data to Cosmos DB
    const databaseId = process.env.COSMOSDB_DATABASE_ID;
    const containerId = process.env.COSMOSDB_CONTAINER_ID;
    const partitionKey = { kind: 'Hash', paths: ['/userId'] };

    const loginData = {
      userId: '<USER_ID>', // Replace with actual user ID
      email,
      password, // **Never store raw password in Cosmos DB, consider hashing!**
    };

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    try {
      await CosmosClient
        .database(databaseId)
        .container(containerId)
        .items.create(loginData, partitionKey);
      console.log('Login data saved to Cosmos DB');
    } catch (error) {
      console.error('Error saving login data to Cosmos DB:', error);
    }

    setLoading(false);
    navigation.navigate('home'); // Navigate to Home screen
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Bem vindo' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign in'}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
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

export default SignInScreen;
