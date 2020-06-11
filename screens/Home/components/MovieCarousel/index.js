import React, {useState, useEffect} from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import axios from 'axios';

const MovieCarousel = () => {
  const [activeDot, setActiveDot] = useState(0);
  const [carouselData, setCarouselData] = useState([]);

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
        containerStyle={styles.carouselDotContainerStyle}
        dotStyle={styles.carouselDotStyle}
        inactiveDotStyle={styles.carouselInactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <View>
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
      <View style={styles.carouselPagination}>{carouselPagination()}</View>
    </View>
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
  carouselPagination: {
    marginTop: -48,
  },
  carouselDotContainerStyle: {
    backgroundColor: 'transparent',
  },
  carouselDotStyle: {
    width: 4,
    height: 4,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: 'white',
  },
  carouselInactiveDotStyle: {
    backgroundColor: 'grey',
  },
});

export default MovieCarousel;
