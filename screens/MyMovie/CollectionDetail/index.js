import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const CollectionDetail = () => {
  const [detailData, setDetailData] = useState({});
  const navigation = useNavigation();
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
    <View>
      <Text>{detailData?.description}</Text>
      <Text>Film-Film Yang Masuk</Text>
      {detailData?.items?.map((item, index) => <Text>{item?.title}</Text>)}
    </View>
  );
};

export default CollectionDetail;
