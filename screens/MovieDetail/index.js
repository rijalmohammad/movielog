import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import axios from 'axios';

const MovieDetail = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/299534?api_key=6911e2f007fccbc5516afc66df11aae9&language=en-US',
      )
      .then(postData => {
        const newData = postData.data;
        setMovieData(newData);
      });
  }, []);

  return (
    <ScrollView>
      <Text>{movieData.title}</Text>
      <Text>{movieData.overview}</Text>
    </ScrollView>
  );
};

export default MovieDetail;
