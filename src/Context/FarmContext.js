import React, { Component } from 'react';
import {FARM_SIZE} from  '../constants';
import { generateNewName } from '../utils/nameService';
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
      position: `${Math.floor(Math.random() * FARM_SIZE)},${Math.floor(Math.random() * FARM_SIZE)}`,
      name: generateNewName(),
      fitness: Math.floor(Math.random() * 100),
      gender: Math.round(Math.random())
    };
    this.setState({ rabbits: [...rabbits, rabbit] });
  };

  updatePosition = (position, id) => {
    const rabbits = this.state.rabbits;
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    const newPos = this.getNewPosition(position);
    rabbit.position = `${newPos[0]},${newPos[1]}`;
    rabbits[index] = rabbit;
    this.setState({ rabbits });
  };



  getNewPosition(position) {

     const move = Math.floor(Math.random() * 4);
     const POSSIBLE_MOVES = ['N','E','S','W'];
     const direction = POSSIBLE_MOVES[move];
     if(direction === 'N') {
       // Out of bounds north, move south
       if (position[0] === 0) {
         return [1, position[1]];
       } 
       return [position[0] -1, position[1]];
     }

     if(direction === 'E') {
       // Out of bounds east, move west
      if(position[1] === FARM_SIZE) {
        return [position[0], position[1] - 1];
      }
      return [position[0], position[1] + 1];
     }

     if(direction === 'S') {
       // Out of bounds south, move north
       if(position[0] === FARM_SIZE) {
        return [FARM_SIZE - 1, position[1]];
       }
       return [position[0] + 1, position[1]];
     }

     if(direction === 'W') {
       if(position[1] === 0) {
        // Out of bounds west, move east
        return [position[0], 1];
       }
       return [position[0], position[1] - 1];

     }
  }

  updateDecay = (id) => {
    const rabbits = this.state.rabbits;
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    rabbit.fitness -= 1;

    // Kanskje heller sette en props dying/dead 
    // så kan vi vise en gravstein eller scull i 0.5 sek før den fjernes
    // ha en funksjon remove dead, som fjerner alle de døde

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
        <button className="btn-legg-til"onClick={this.addRabbit}>Legg til</button>
        {this.props.children}
      </FarmContext.Provider>
    );
  }
}
