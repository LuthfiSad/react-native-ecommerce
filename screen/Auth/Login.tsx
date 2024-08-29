import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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
        value={email}
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
          value={password}
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
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Login Successfully');
          login('Muhamad Luthfi Sadli', 1000000);
          navigation.navigate('Profile');
        }}
        style={[
          styles.buttonLogin,
          (!email || !password) && styles.disabledButtonLogin,
        ]}
        disabled={!email || !password}>
        <Text
          style={[
            styles.loginText,
            (!email || !password) && styles.disabledLoginText,
          ]}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
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
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 5,
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
    color: '#000',
    flex: 1, // Untuk membuat input password menempati sisa ruang
  },
  buttonLogin: {
    backgroundColor: '#4C76A3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButtonLogin: {
    backgroundColor: '#ddd', // Warna untuk tombol yang dinonaktifkan
  },
  loginText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
  disabledLoginText: {
    color: '#999',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#000',
  },
  link: {
    color: '#4C76A3',
  },
});

export default LoginScreen;
