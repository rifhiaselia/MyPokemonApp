import axios from 'axios';
import {GET_POKEMON, GET_DETAIL_POKEMON, NEXT, PREVIOUS} from '../types';

export const getDataPokemon = data => ({
  type: GET_POKEMON,
  payload: data,
});

export const getDataPokemonDetail = data => ({
  type: GET_DETAIL_POKEMON,
  payload: data,
});

export const GetDataPokemon = () => {
  return async dispatch => {
      await axios.get("https://pokeapi.co/api/v2/pokemon/").then(async response => {
          dispatch(getDataPokemon(response.data))
      }).catch(error=>{
          console.log(error);
      })
  }
};

export const GetDataPokemonNext = (url) => {
  return async dispatch => {
      await axios.get(url).then(async response => {
          dispatch(getDataPokemon(response.data))
      }).catch(error=>{
          console.log(error);
      })
  }
};

export const GetDataPokemonPrev = (url) => {
  return async dispatch => {
      await axios.get(url).then(async response => {
          dispatch(getDataPokemon(response.data))
      }).catch(error=>{
          console.log(error);
      })
  }
};

export const GetDataPokemonDetail = (url, navigation, userId) => {
  return async dispatch => {
      await axios.get(url).then(async response => {
          dispatch(getDataPokemonDetail(response.data))
          navigation.navigate('DetailScreen', {userId:userId})
      }).catch(error=>{
          console.log(error);
      })
  }
};