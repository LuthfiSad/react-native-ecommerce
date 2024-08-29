// src/screens/ProfileScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const ChangeProfileScreen = () => {
  const [username, setUsername] = useState('Your Username');
  const [email, setEmail] = useState('youremail@example.com');

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={username}
        onFocus={e => e.target.setNativeProps({style: {borderColor: '#000'}})}
        onBlur={e => {
          if (!username) {
            e.target.setNativeProps({style: {borderColor: '#888'}});
          }
        }}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onFocus={e => e.target.setNativeProps({style: {borderColor: '#000'}})}
        onBlur={e => {
          if (!email) {
            e.target.setNativeProps({style: {borderColor: '#888'}});
          }
        }}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Button
        title="Save"
        color="#4C76A3"
        onPress={() => {
          Alert.alert('Profile updated!');
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4C76A3',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ChangeProfileScreen;
