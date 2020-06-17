import React, {useState, useContext} from 'react';
import {View, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../../../contexts/authContext';

const CollectionAdd = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const auth = useContext(AuthContext);

  const handleAdd = () => {
    const dataPost = {
      name: name,
      description: desc,
      language: 'en',
    };

    const url = `https://api.themoviedb.org/3/list?api_key=6911e2f007fccbc5516afc66df11aae9&session_id=${
      auth.sessionId
    }`;

    axios.post(url, dataPost).then(postData => {
      const newData = postData.data;
      if (newData.success) {
        navigation.navigate('Collection');
      }
    });
  };

  return (
    <View>
      <TextInput
        onChangeText={text => setName(text)}
        value={name}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      />
      <TextInput
        onChangeText={text => setDesc(text)}
        value={desc}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      />
      <Button title="Tambah List" onPress={() => handleAdd()} />
    </View>
  );
};

export default CollectionAdd;
