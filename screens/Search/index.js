import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const searchEncoded = encodeURIComponent(searchVal);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=6911e2f007fccbc5516afc66df11aae9&language=en-US&query=${searchEncoded}&page=1&include_adult=false`,
      )
      .then(postData => {
        const newData = postData.data.results;
        setSearchResult(newData);
      });
  }, [searchVal]);

  const handleChangeValue = newVal => {
    setSearchVal(newVal);
  };

  return (
    <ScrollView>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleChangeValue}
        value={searchVal}
        containerStyle={{backgroundColor: 'transparent'}}
      />
      <View>
        {searchResult.map((item, index) => (
          <View style={styles.searchItem}>
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
              }}
              style={styles.searchImage}
            />
            <View style={styles.searchDetail}>
              <Text>{item.title}</Text>
              <View style={styles.searchVote}>
                <MaterialCommunityIcons name="star" size={20} color="orange" />
                <Text>{item.vote_average}</Text>
              </View>
              <Text>Release Date: {item.release_date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'transparent',
  },
  searchItem: {
    margin: 16,
    flexDirection: 'row',
  },
  searchImage: {
    width: 75,
    height: 110,
  },
  searchDetail: {
    marginLeft: 16,
  },
  searchVote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Search;
