import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=6911e2f007fccbc5516afc66df11aae9',
      )
      .then(postData => {
        const newData = postData.data.results;
        setMovieData(newData);
      });
  }, []);

  return (
    <View style={styles.popularContainer}>
      <View style={styles.popularTitle}>
        <Text style={styles.popularMovieTitle}>Most Popular Movies</Text>
      </View>
      <ScrollView style={styles.popularList} horizontal={true}>
        {movieData.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Movie Detail', {id: item.id})}>
            <View style={styles.popularItem}>
              <Image
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                }}
                style={styles.movieImage}
              />
              <Text style={styles.popularMovieTitle}>{item.title}</Text>
              <View style={styles.popularMovieStar}>
                <MaterialCommunityIcons name="star" size={20} color="orange" />
                <Text>{item.vote_average}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  popularContainer: {
    marginLeft: 16,
  },
  popularList: {
    flexDirection: 'row',
  },
  popularTitle: {
    marginBottom: 16,
  },
  popularItem: {
    width: 150,
    marginRight: 16,
  },
  popularMovieStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularMovieTitle: {
    fontWeight: 'bold',
  },
  movieImage: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
});

export default MovieList;
