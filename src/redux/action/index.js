import axios from 'axios';
import {GET_POKEMON, GET_DETAIL_POKEMON, NEXT, PREVIOUS} from '../types';

export const getDataPokemon = data => ({
  type: GET_POKEMON,
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
