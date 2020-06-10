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
      />
      <View>
        {searchResult.map((item, index) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Search;
