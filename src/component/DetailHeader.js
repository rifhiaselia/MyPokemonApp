import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const DetailHeader = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Pokemon Detail</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.Text}>Catch</Text>
        
      </TouchableOpacity>
    </View>
  );
};

export default DetailHeader;

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
