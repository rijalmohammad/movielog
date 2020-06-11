import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {AuthContext} from './contexts/authContext';

const LoginApp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureView, setSecureView] = useState(true);
  const auth = useContext(AuthContext);

  const handleLogin = () => {
    auth.login(username, password);
  };

  return (
    <View>
      <Text>Ini Belum Login</Text>
      <TextInput
        onChangeText={text => setUsername(text)}
        value={username}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        secureTextEntry={secureView}
      />
      <Button
        title={secureView ? 'Show Password' : 'Hide Password'}
        onPress={() => setSecureView(!secureView)}
      />
      <Button title="Login" onPress={() => handleLogin()} />
    </View>
  );
};

export default LoginApp;
