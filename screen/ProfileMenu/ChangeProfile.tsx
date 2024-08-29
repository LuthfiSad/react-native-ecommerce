// src/screens/ProfileScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

const ChangeProfileScreen = () => {
  const [username, setUsername] = useState('Your Username');
  const [email, setEmail] = useState('youremail@example.com');

  const navigation = useNavigation();

  return (
    <>
      <ButtonHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onFocus={e => e.target.setNativeProps({style: {borderColor: '#000'}})}
          onBlur={e => {
            if (!username) {
              e.target.setNativeProps({style: {borderColor: '#888'}});
            }
          }}
          onChangeText={setUsername}
          placeholderTextColor={'#888'}
        />
        <TextInput
          onFocus={e => e.target.setNativeProps({style: {borderColor: '#000'}})}
          onBlur={e => {
            if (!email) {
              e.target.setNativeProps({style: {borderColor: '#888'}});
            }
          }}
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={'#888'}
        />
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Update Successfully');
            navigation.goBack();
          }}
          style={[
            styles.buttonSave,
            (!email || !username) && styles.disabledButtonSave,
          ]}
          disabled={!email || !username}>
          <Text
            style={[
              styles.saveText,
              (!email || !username) && styles.disabledSaveText,
            ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    // textTransform: 'uppercase',
    fontWeight: 'bold',
    // letterSpacing: 5,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4C76A3',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonSave: {
    backgroundColor: '#4C76A3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButtonSave: {
    backgroundColor: '#ddd', // Warna untuk tombol yang dinonaktifkan
  },
  saveText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
  disabledSaveText: {
    color: '#999',
  },
});

export default ChangeProfileScreen;
