import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from './contexts/authContext';
import {Input, Button} from 'react-native-elements';

const LoginApp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureView, setSecureView] = useState(true);
  const auth = useContext(AuthContext);

  const handleLogin = () => {
    auth.login(username, password);
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitle}>Welcome to Movielog</Text>
      <Input
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Input
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={secureView}
      />
      <Button title="Login" onPress={() => handleLogin()} />
    </View>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  appContainer: {
    marginTop: 40,
    paddingRight: 16,
    paddingLeft: 16,
  },
  storyDesc: {
    marginTop: 8,
  },
});

export default LoginApp;
