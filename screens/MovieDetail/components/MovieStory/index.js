import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MovieStory = ({data}) => {
  const {overview} = data; // data.overview
  return (
    <View style={styles.storyContainer}>
      <Text style={styles.storyTitle}>Storyline</Text>
      <Text style={styles.storyDesc}>{overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    marginRight: 16,
    marginLeft: 16,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  storyDesc: {
    marginTop: 8,
  },
});

export default MovieStory;
