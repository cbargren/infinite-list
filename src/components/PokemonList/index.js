import React, { Component } from 'react';

export default class extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    const { pokemon } = this.props;
    return (
      <div>
        {pokemon.map(p => (
          <div>
            <span>{p.name}</span>
            &nbsp;
            <span>{p.national_id}</span>
          </div>
        ))}
      </div>
    );
  }
}
