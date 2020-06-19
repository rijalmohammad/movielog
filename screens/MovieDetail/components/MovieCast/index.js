import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

const MovieCast = ({movieId}) => {
  const [castData, setCastData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6911e2f007fccbc5516afc66df11aae9`,
      )
      .then(postData => {
        const newData = postData.data;
        setCastData(newData.cast);
      });
  }, [movieId]);

  return (
    <View style={styles.castContainer}>
      <Text style={styles.castTitle}>Cast</Text>
      <ScrollView horizontal={true}>
        {castData?.map((item, index) => (
          <View key={index} style={styles.castItem}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + item.profile_path,
              }}
            />
            <Text style={styles.castName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  castContainer: {
    margin: 16,
    marginBottom: 0,
  },
  castTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  castItem: {
    width: 60,
    marginRight: 16,
  },
});

export default MovieCast;
