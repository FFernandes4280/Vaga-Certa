import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput } from 'react-native';

import ImageViewer from '../../components/Home_Image';
import Login from '../../components/Login'; 
import Registro from '../../components/Registro';

import login from '../../assets/class/login'; 
import React from 'react';
 
export default function Inicial() {
  const email = '';
  const password = '';
  const dados = new login('email', 'password');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer/>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(newEmail) => {
            dados.setemail(newEmail);
          }}
        value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(newPassword) => {
            dados.setpassword(newPassword);
          }}
          value={password}
          secureTextEntry={true}
        />
      </View> 
      <View style={styles.footerContainer}>
        <Login login={dados}/> 
        <Registro />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 14,
  },
  footerContainer: {
    flex: 1/2,
    alignItems: 'center',
  },
  input: {
    width: 140,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1/2,
    backgroundColor: '#25292e',
  },
});
