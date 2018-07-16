import fp from 'lodash/fp';
import { connect } from 'react-redux';

import { loadPage } from '../../actions/pokemon';
import PokemonList from '../../components/PokemonList';

const getOrderedListByIndex = fp.pipe(
  fp.toPairs,
  fp.sortBy([([i]) => fp.toNumber(i)]),
  fp.map(([i, data]) => data)
);

const mapStateToProps = state => ({
  pokemon: getOrderedListByIndex(state.pokemon.pokemonByIndex)
});

const mapDispatchToProps = dispatch => ({
  onInit: () => dispatch(loadPage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
