import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home, Detail, Login, Pokebag, Register} from '../pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PokebagScreen"
        component={Pokebag}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Router;
