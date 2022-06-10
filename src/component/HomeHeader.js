import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const HomeHeader = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Home</Text>
      <Text style={styles.Text}>Pokedex</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.Text}>Pokebag</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#555555',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  Text: {
    fontSize: 22,
    color: '#f1e8e8',
    fontWeight: 'bold',
  },
});
