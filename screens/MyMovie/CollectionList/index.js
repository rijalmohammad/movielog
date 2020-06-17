import React, {useEffect, useContext} from 'react';
import {Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../../contexts/authContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const CollectionList = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.loadList();
  }, [auth]);

  return (
    <View>
      {auth?.listValue?.map((item, index) => (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('Collection Detail', {id: item.id})
          }>
          <Text>{item.name}</Text>
        </TouchableWithoutFeedback>
      ))}

      <Button
        title="Tambah List"
        onPress={() => navigation.navigate('Add Collection')}
      />
    </View>
  );
};

export default CollectionList;
