import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDataPokemon,
  GetDataPokemon,
  GetDataPokemonDetail,
  GetDataPokemonNext,
  GetDataPokemonPrev,
} from '../redux/action';
import {PREVIOUS, NEXT} from '../redux/types';
import {HomeHeader} from '../component';

const Home = ({navigation, route}) => {
  const {userData} = route.params;
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const allPokemon = useSelector(state => state.appData.pokemonData);

  useEffect(() => {
    dispatch(GetDataPokemon());
  }, []);

  const nextPage = () => {
    if (allPokemon.next === null) {
      alert('Halaman Tidak Ada!');
    } else {
      dispatch(GetDataPokemonNext(allPokemon.next));
      setpage(page + 1);
    }
  };

  const previousPage = () => {
    if (allPokemon.previous === null) {
      alert('Halaman Tidak Ada!');
    } else {
      dispatch(GetDataPokemonPrev(allPokemon.previous));
      setpage(page - 1);
    }
  };

  const renderData = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        dispatch(GetDataPokemonDetail(item.url, navigation, userData.id))
      }
      style={styles.buttonItem}>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HomeHeader onPress={() => navigation.navigate('PokebagScreen')} />
      <FlatList
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        data={allPokemon.results}
        renderItem={renderData}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => previousPage()}
          style={styles.buttonDown}>
          <Text style={{fontSize: 15, color: '#f1e8e8'}}>PREVIOUS</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 15, color: '#eaeaea'}}>{page}</Text>
        <TouchableOpacity onPress={() => nextPage()} style={styles.buttonDown}>
          <Text style={{fontSize: 15, color: '#f1e8e8'}}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonItem: {
    width: '49%',
    height: 40,
    backgroundColor: '#ffffff',
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  buttonDown: {
    width: '35%',
    height: 30,
    backgroundColor: '#555555',
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
