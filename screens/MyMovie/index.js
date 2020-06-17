import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CollectionList from './CollectionList';
import CollectionAdd from './CollectionAdd';
import CollectionDetail from './CollectionDetail';

const Stack = createStackNavigator();

const MyMovie = () => {
  return (
    <Stack.Navigator initialRouteName="Collection">
      <Stack.Screen name="Collection" component={CollectionList} />
      <Stack.Screen name="Collection Detail" component={CollectionDetail} />
      <Stack.Screen name="Add Collection" component={CollectionAdd} />
    </Stack.Navigator>
  );
};

export default MyMovie;
