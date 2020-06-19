import React, {useEffect, useContext} from 'react';
import {
  Button,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../../contexts/authContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const CollectionList = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.loadList();
  }, [auth]);

  const handleDelete = listId => {
    axios
      .delete(
        `https://api.themoviedb.org/3/list/${listId}?api_key=6911e2f007fccbc5516afc66df11aae9&session_id=${
          auth.sessionId
        }`,
      )
      .then(postData => {});
  };

  return (
    <ScrollView style={{margin: 16}}>
      <View style={{marginBottom: 16}}>
        {auth?.listValue?.map((item, index) => (
          <View
            key={index}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableWithoutFeedback
              style={{width: Dimensions.get('window').width - 82}}
              onPress={() =>
                navigation.navigate('Collection Detail', {id: item.id})
              }>
              <Text>{item.name}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleDelete(item.id)}>
              <MaterialCommunityIcons name="trash-can" size={20} color="red" />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>

      <Button
        title="Tambah List"
        onPress={() => navigation.navigate('Add Collection')}
      />
      <View>
        <Text style={{marginTop: 16, marginBottom: 16}}>
          Latest Rated Movie:
        </Text>
        {auth?.listRated?.map((item, index) => (
          <View style={styles.collectionItem}>
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
              }}
              style={styles.collectionImage}
            />
            <View style={styles.collectionDetail}>
              <Text>{item.title}</Text>
              <View style={styles.collectionVote}>
                <MaterialCommunityIcons name="star" size={20} color="orange" />
                <Text>{item.vote_average}</Text>
              </View>
              <Text>Release Date: {item.release_date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  collectionItem: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  collectionImage: {
    width: 75,
    height: 110,
  },
  collectionDetail: {
    marginLeft: 16,
  },
  collectionVote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CollectionList;
