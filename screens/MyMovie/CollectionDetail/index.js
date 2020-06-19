import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CollectionDetail = () => {
  const [detailData, setDetailData] = useState({});
  const route = useRoute();

  const listId = route.params.id;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/list/${listId}?api_key=6911e2f007fccbc5516afc66df11aae9&language=en-US`,
      )
      .then(postData => {
        const newData = postData.data;
        setDetailData(newData);
      });
  }, [listId]);

  return (
    <View style={styles.collectionContainer}>
      <Text style={styles.collectionName}>{detailData?.name}</Text>
      <Text style={styles.collectionDesc}>{detailData?.description}</Text>
      <Text style={styles.collectionListText}>List: </Text>
      {detailData?.items?.map((item, index) => (
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
  );
};

const styles = StyleSheet.create({
  collectionContainer: {
    margin: 16,
  },
  collectionName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  collectionListText: {
    marginBottom: 8,
    marginTop: 8,
  },
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

export default CollectionDetail;
