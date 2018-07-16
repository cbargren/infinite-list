import fp from 'lodash/fp';

import { loadPageStarted, loadPageSucceeded } from '../actions/pokemon';

const init = () => ({
  isFetching: false,
  pokemonByIndex: {}
});

export default (state = init(), action) => {
  switch (action.type) {
    case loadPageStarted: {
      const { start, end } = action;
      const updates = fp.pipe(
        fp.keyBy(fp.identity),
        fp.mapValues(fp.constant('LOADING'))
      )(fp.range(start, end));
      return {
        ...state,
        isFetching: true,
        pokemonByIndex: {
          ...updates,
          ...state.pokemonByIndex
        }
      };
    }
    case loadPageSucceeded: {
      const { data, start, end } = action;
      const updates = fp.pipe(
        fp.keyBy(fp.identity),
        fp.mapValues(i => data[i - start])
      )(fp.range(start, end));
      return {
        ...state,
        isFetching: false,
        pokemonByIndex: {
          ...state.pokemonByIndex,
          ...updates
        }
      };
    }
    default:
      return state;
  }
};
