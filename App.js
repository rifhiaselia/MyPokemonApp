import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CodePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Router from './src/router';

const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    // appendReleaseDescription: true,
    title: 'a new update is available!',
  },
};

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
};

export default CodePush(CodePushOptions)(App);

const styles = StyleSheet.create({});

