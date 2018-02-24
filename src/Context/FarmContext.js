import React, { Component } from 'react';

const defaultState = {
  rabbits: ['0,1', '2,3', '3,4'],
  carrots: 0
};

export const FarmContext = React.createContext(defaultState);

export default class FarmStore extends Component {
  state = defaultState;

  addRabbit = () => {
    const rabbits = this.state.rabbits;
    
    this.setState({ rabbits: [...rabbits, '0,4'] });
  };

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
          positions: this.state.positions
        }}
      >
        <button onClick={this.addRabbit}>Add Rabbit </button>
        {this.props.children}
      </FarmContext.Provider>
    );
  }
}
