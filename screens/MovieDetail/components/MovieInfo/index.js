import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MovieInfo = ({data}) => {
  const {
    poster_path,
    backdrop_path,
    title,
    genres,
    runtime,
    release_date,
    revenue,
    vote_average,
  } = data;
  return (
    <View>
      <Image
        style={styles.topBackdrop}
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + backdrop_path,
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.topInfo}>
          <Image
            style={styles.topPoster}
            source={{
              uri: 'https://image.tmdb.org/t/p/w500' + poster_path,
            }}
          />
          <View style={styles.topDetails}>
            <View>
              <Text style={styles.topTitle}>{title}</Text>
            </View>
            <View style={styles.topNumber}>
              <View style={styles.topRating}>
                <MaterialCommunityIcons name="star" size={20} color="orange" />
                <Text>{vote_average}</Text>
              </View>
              <View style={styles.topDuration}>
                <MaterialCommunityIcons name="timer" size={20} color="black" />
                <Text>{runtime} min</Text>
              </View>
            </View>
            <View style={styles.topGenre}>
              {genres?.map((item, index) => (
                <View style={styles.topGenreItem}>
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.bottomInfo}>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomHighlight}>Release Date:</Text>
            <Text>{release_date}</Text>
          </View>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomHighlight}>Revenue:</Text>
            <Text>{revenue}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    margin: 16,
    marginTop: -42,
  },
  topBackdrop: {
    width: Dimensions.get('window').width,
    height: 180,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  topPoster: {
    width: 92,
    height: 134,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ffff',
    borderBottomWidth: 0,
    shadowColor: '#ffff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  topDetails: {
    marginLeft: 8,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topNumber: {
    marginTop: 8,
    flexDirection: 'row',
  },
  topRating: {
    flexDirection: 'row',
  },
  topDuration: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  topGenre: {
    marginTop: 8,
    flexDirection: 'row',
  },
  topGenreItem: {
    marginRight: 8,
    backgroundColor: '#F5F3F4',
    borderRadius: 4,
    padding: 4,
  },
  bottomInfo: {
    marginTop: 24,
  },
  bottomItem: {
    flexDirection: 'row',
  },
  bottomHighlight: {
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default MovieInfo;
