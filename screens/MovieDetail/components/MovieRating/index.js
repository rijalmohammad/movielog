import React, {useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../../contexts/authContext';
import axios from 'axios';

const MovieRating = ({movieId}) => {
  const [starValue, setStarValue] = useState(0);
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  const handleRate = () => {
    const postValue = {
      value: starValue,
    };

    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=6911e2f007fccbc5516afc66df11aae9&session_id=${
      auth.sessionId
    }`;

    axios.post(url, postValue).then(postData => {
      const newData = postData.data;
      if (newData.status_code === 1) {
        navigation.navigate('My Movie');
      }
    });
  };

  return (
    <View style={{margin: 16}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 8}}>
        Rate This Movie
      </Text>
      <StarRating
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={10}
        rating={starValue}
        selectedStar={rating => setStarValue(rating)}
        fullStarColor={'orange'}
      />
      <Button title="Rate" onPress={() => handleRate()} />
    </View>
  );
};

export default MovieRating;
