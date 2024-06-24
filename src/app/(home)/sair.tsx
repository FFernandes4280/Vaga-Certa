import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Redirect, Stack } from 'expo-router';
import { supabase } from '../../lib/supabase';

const Sair = () => {
  const [redirect, setRedirect] = useState(false);
  supabase.auth.signOut();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Redirect href="/entrar" />;
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Sair;
