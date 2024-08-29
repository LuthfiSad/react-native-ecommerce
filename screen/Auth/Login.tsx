import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useUser} from '../../src/hooks/useUser';

const LoginScreen = () => {
  const {login} = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onFocus={e => e.target.setNativeProps({style: {borderColor: '#000'}})}
        onBlur={e => {
          if (!email) {
            e.target.setNativeProps({style: {borderColor: '#888'}});
          }
        }}
        onChangeText={setEmail}
        placeholderTextColor={'#888'}
      />
      <View
        style={[
          styles.passwordContainer,
          (passwordIsFocused || !!password) && {borderColor: '#000'},
        ]}>
        <TextInput
          style={styles.passwordInput}
          onFocus={() => setPasswordIsFocused(true)}
          onBlur={() => setPasswordIsFocused(false)}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={'#888'}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="#4C76A3"
          />
        </TouchableOpacity>
      </View>
      <Button
        title="Login"
        color="#4C76A3"
        onPress={() => {
          Alert.alert('Login Successfully');
          login('Muhamad Luthfi Sadli', 1000000);
          navigation.navigate('Profile');
        }}
      />
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
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
    borderColor: '#888',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1, // Untuk membuat input password menempati sisa ruang
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  link: {
    color: '#4C76A3',
  },
});

export default LoginScreen;
