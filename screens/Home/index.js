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

const Home = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeDot, setActiveDot] = useState(0);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?api_key=6911e2f007fccbc5516afc66df11aae9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
      )
      .then(postData => {
        const newData = postData.data.results;
        setMovieData(newData);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?api_key=6911e2f007fccbc5516afc66df11aae9&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1',
      )
      .then(postData => {
        const newData = postData.data.results;
        setCarouselData(newData);
      });
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
          }}
          style={styles.carouselImage}
        />
      </View>
    );
  };

  const carouselPagination = () => {
    return (
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeDot}
        containerStyle={{backgroundColor: 'transparent'}}
        dotStyle={{
          width: 4,
          height: 4,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: 'white',
        }}
        inactiveDotStyle={{
          backgroundColor: 'grey',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <ScrollView>
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setActiveDot(index)}
      />
      <View style={{marginTop: -48}}>{carouselPagination()}</View>
      <View style={styles.popularMovies}>
        <View style={styles.popularTitle}>
          <Text>Most Popular Movies</Text>
        </View>
        <ScrollView style={styles.popularList} horizontal={true}>
          {movieData.map((item, index) => (
            <View style={styles.popularItem}>
              <Image
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                }}
                style={styles.movieImage}
              />
              <Text>{item.title}</Text>
              <Text>{item.vote_average}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 16,
  },
  popularList: {
    flexDirection: 'row',
  },
  popularTitle: {
    marginBottom: 16,
  },
  popularItem: {
    paddingRight: 16,
  },
  popularMovies: {
    marginTop: 24,
    marginLeft: 16,
  },
  movieImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
});

export default Home;
