import {GET_POKEMON, GET_DETAIL_POKEMON, NEXT, PREVIOUS} from '../types';

const initialState = {
  pokemonData: [],
  detailPokemon: [],
};

export const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemonData: action.payload,
      };

    case GET_DETAIL_POKEMON:
      return {
        ...state,
        detailPokemon: action.payload,
      };

    default:
      return state;
  }
};
