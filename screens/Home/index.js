import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieCarousel from './components/MovieCarousel';
import MovieList from './components/MovieList';
import MovieDetail from '../MovieDetail';
import {AuthContext} from '../../contexts/authContext';
import {Button} from 'react-native-elements';

const Stack = createStackNavigator();

const Timeline = () => {
  const auth = useContext(AuthContext);

  return (
    <ScrollView>
      <MovieCarousel />
      <MovieList />
      <View style={{margin: 16}}>
        <Button title="Logout" onPress={() => auth.logout()} />
      </View>
    </ScrollView>
  );
};

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Timeline">
      <Stack.Screen name="Timeline" component={Timeline} />
      <Stack.Screen
        name="Movie Detail"
        component={MovieDetail}
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default Home;
