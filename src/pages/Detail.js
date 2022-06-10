import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {DetailHeader} from '../component';

const Detail = ({navigation, route}) => {
  const {userId} = route.params;
  const [disCatch, setDisCatch] = useState(false);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const detailPokemon = useSelector(state => state.appData.detailPokemon);

  useEffect(() => {
    console.log(detailPokemon);
    setTypes(detailPokemon.types);
    setAbilities(detailPokemon.abilities);
    const reference = database().ref(`/pokeBag/${userId}`);
    reference.on('value', snapshot => {
      if (snapshot.val()) {
        checkPokemon(snapshot.val());
      }
    });
  });

  const tambahPokemon = () => {
    const reference = database().ref(`/pokeBag/${userId}`);
    const tangkap = Math.floor(Math.random() * 30);
    try {
      if (tangkap > 5) {
        reference.push({
          id: detailPokemon?.id,
          name: detailPokemon?.name,
          types: detailPokemon.types,
          abilities: detailPokemon.abilities,
          sprites:
            detailPokemon?.sprites?.other['official-artwork'].front_default,
        });
        setDisCatch(false);
        alert('Berhasil di tangkap!');
      } else {
        alert('Pokemon Kabur!');
      }
    } catch (error) {
      alert('Gagal menambahkan pokemon!');
    }
  };

  const checkPokemon = item => {
    let keyFirebase = [];
    keyFirebase = Object.keys(item);
    for (let i = 0; i < keyFirebase.length; i++) {
      if (item[keyFirebase[i]].name.includes(detailPokemon?.name)) {
        setDisCatch(true);
      }
    }
  };

  const renderTypes = ({item}) => (
    <Text style={{fontSize: 20, color: '#262626'}}>{item.type.name}</Text>
  );
  const renderAbilities = ({item}) => (
    <Text style={{fontSize: 20, color: '#262626'}}>{item.ability.name}</Text>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#f1e8e8'}}>
      <View style={styles.container1}>
        <DetailHeader />
        <Image
          source={{
            uri: detailPokemon?.sprites?.other['official-artwork']
              .front_default,
          }}
          style={{width: 250, height: 250}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 35, color: '#262626'}}>
          {detailPokemon.name}
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: '#262626',
          }}>
          PROFILE
        </Text>
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.text}>Height : {detailPokemon.height}</Text>
          <Text style={styles.text}>Weight : {detailPokemon.weight}</Text>
          <Text style={styles.text}>
            Species : {detailPokemon.species.name}
          </Text>
        </View>
        <Text style={styles.text1}>Types : </Text>
        <FlatList
          data={types}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTypes}
          columnWrapperStyle={{
            flexDirection: 'column',
            marginHorizontal: 10,
          }}
        />
        <Text style={styles.text1}>Abilities : </Text>
        <FlatList
          data={abilities}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderAbilities}
          columnWrapperStyle={{
            flexDirection: 'column',
            marginHorizontal: 10,
          }}
        />
        {disCatch ? null : (
          <TouchableOpacity onPress={tambahPokemon}>
            <Text style={styles.text2} >Catch Pokemon !</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: '#f1e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  text: {
    marginBottom: 5,
    fontSize: 20,
    color: '#262626',
    marginHorizontal : 10,
  },
  text1: {
    marginBottom: 5,
    fontSize: 25,
    color: '#262626',
    fontWeight: 'bold',
  },
  text2: {
    marginTop: 5,
    fontSize: 20,
    color: '#262626',
    fontWeight: 'bold', },
});
