import React, { Component } from 'react';

const defaultState = {
  rabbits: [],
  carrots: 0
};

export const FarmContext = React.createContext(defaultState);

export default class FarmStore extends Component {
  state = defaultState;

  addRabbit = () => {
    const rabbits = this.state.rabbits;
    const rabbit = {
      id: Date.now(),
      position: `${Math.floor(Math.random() * 4)},${Math.floor(Math.random() * 4)}`,
      name: `Bob-${Date.now()}`,
      fitness: Math.floor(Math.random() * 50),
      gender: Math.round(Math.random())
    };
    this.setState({ rabbits: [...rabbits, rabbit] });
  };

  updatePosition = (position, id) => {
    const rabbits = this.state.rabbits;
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    const newPos = [position[0], position[1] > 3 ? 0 : position[1] + 1];
    rabbit.position = `${newPos[0]},${newPos[1]}`;
    rabbits[index] = rabbit;
    this.setState({ rabbits });
  };

  updateDecay = (id) => {
    const rabbits = this.state.rabbits;
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    rabbit.fitness -= 1;
    if(rabbit.fitness <= 0 ) {
      this.killRabbit(rabbit)
    } else {
      rabbits[index] = rabbit;
      this.setState({ rabbits });
    }

  };

  killRabbit = (rabbit) => {
    const rabbits = this.state.rabbits;
    var indexOfDeadRabbit = rabbits.indexOf(rabbit)
    rabbits.splice(indexOfDeadRabbit, 1);
    this.setState({rabbits});
  }

  render() {
    return (
      <FarmContext.Provider
        value={{
          rabbits: this.state.rabbits,
          carrots: this.state.carrots,
          updatePosition: this.updatePosition,
          updateDecay: this.updateDecay,
          positions: this.state.positions
        }}
      >
        <button onClick={this.addRabbit}>Add Rabbit</button>
        {this.props.children}
      </FarmContext.Provider>
    );
  }
}
