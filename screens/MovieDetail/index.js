import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import MovieInfo from './components/MovieInfo';
import MovieStory from './components/MovieStory';
import MovieCast from './components/MovieCast';
import MoviePicker from './components/MoviePicker';
import MovieRating from './components/MovieRating';

const MovieDetail = () => {
  const [movieData, setMovieData] = useState([]);
  const route = useRoute();

  const movieId = route.params.id;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=6911e2f007fccbc5516afc66df11aae9&language=en-US`,
      )
      .then(postData => {
        const newData = postData.data;
        setMovieData(newData);
      });
  }, [movieId]);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <MovieInfo data={movieData} />
      <MovieStory data={movieData} />
      <MovieCast movieId={movieId} />
      <MoviePicker movieId={movieId} />
      <MovieRating movieId={movieId} />
    </ScrollView>
  );
};

export default MovieDetail;
