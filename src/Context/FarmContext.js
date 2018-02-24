import React, { Component } from 'react';

const defaultState = {
  rabbits: 0,
  carrots: 0,
  positions: {
    '0,0': 0,
    '0,1': 0,
    '0,2': 0,
    '1,0': 0,
    '1,1': 0,
    '1,2': 0,
    '2,0': 0,
    '2,1': 0,
    '2,2': 0,
  }
};

export const FarmContext = React.createContext(defaultState);

export default class FarmStore extends Component {
  state = this.defaultState;

  updatePosition = (coordinate, inc) => {
    const positions = { ...this.state.positions };
    positions[coordinate] = inc
      ? positions[coordinate] + 1
      : positions[coordinate] - 1;
    this.setSate({
      positions
    });
  };

  render() {
    return (
      <FarmContext.Provider
        value={{
          rabbits: this.state.rabbits,
          carrots: this.state.carrots,
          updatePosition: this.state.updatePosition,
          positions: this.state.positions,
        }}
      >
        {this.props.children}
      </FarmContext.Provider>
    );
  }
}
