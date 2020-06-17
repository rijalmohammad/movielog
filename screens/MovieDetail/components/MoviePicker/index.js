import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../../contexts/authContext';
import axios from 'axios';

const MoviePicker = ({movieId}) => {
  const [val, setVal] = useState('');
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  const handleAdd = () => {
    const body = {
      media_id: Number(movieId),
    };

    const url = `https://api.themoviedb.org/3/list/${val}/add_item?api_key=6911e2f007fccbc5516afc66df11aae9&session_id=${
      auth.sessionId
    }`;

    axios.post(url, body).then(postData => {
      const newData = postData.data;
      if (newData.status_code === 12) {
        navigation.navigate('My Movie');
      }
    });
  };

  useEffect(() => {
    auth.loadList();
  }, [auth]);

  return (
    <View>
      <Text>Add This Movie To</Text>
      <View>
        <Picker
          selectedValue={val}
          style={{height: 50, width: 200}}
          onValueChange={(itemValue, itemIndex) => setVal(itemValue)}>
          {auth?.listValue?.map((item, index) => (
            <Picker.Item label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>
      <Text>
        {val} - {movieId}
      </Text>
      <Button title="Add" onPress={() => handleAdd()} />
    </View>
  );
};

export default MoviePicker;
