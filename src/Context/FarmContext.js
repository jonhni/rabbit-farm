import React, { Component } from 'react';
import { FARM_SIZE } from '../constants';
import { rabbits } from '../utils/rabbitGenerator';
import ReactModal from 'react-modal';
const defaultState = {
  rabbits: [],
  events: [],
  carrots: 0,
  fight: false
};

export const FarmContext = React.createContext(defaultState);

export default class FarmStore extends Component {
  state = defaultState;
  rabbitGenerator = rabbits();

  addRabbit = () => {
    const rabbits = this.state.rabbits;
    const rabbit = this.rabbitGenerator.next().value;

    this.setState({ rabbits: [...rabbits, rabbit] });
  };

  updatePosition = (position, id) => {
    const rabbits = [...this.state.rabbits];
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    const newPos = this.getNewPosition(position);
    rabbit.position = `${newPos[0]},${newPos[1]}`;
    rabbits[index] = rabbit;
    const collidingRabbits = this.collidingRabbits(rabbits);
    this.setState({ rabbits });
    if (collidingRabbits.length > 1) {
      this.handleColission(collidingRabbits);
    }
  };

  handleColission(collidingRabbits) {
    const [winner, looser] = this.decideOutcome(collidingRabbits);
    const events = [...this.state.events];
    const event = this.generateEvent(winner, looser, 'fight');
    this.setState({ events: [...events, event] });
    this.killRabbit(looser);
  }

  generateEvent(winner, looser, type) {
    return { winner, looser, type, timestamp: Date.now() };
  }

  collidingRabbits(rabbits) {
    const [positions, collidingRabbits] = [{}, []];
    rabbits.forEach(rabbit => {
      if (!positions[rabbit.position]) {
        positions[rabbit.position] = rabbit;
      } else {
        collidingRabbits.push(positions[rabbit.position], rabbit);
      }
    });
    return collidingRabbits;
  }

  decideOutcome(collidingRabbits) {
    const [one, two] = collidingRabbits.map(a => ({...a}));
    return Math.random() < 0.5 ? [one, two] : [two, one];
  }

  getNewPosition(position) {
    const move = Math.floor(Math.random() * 4);
    const POSSIBLE_MOVES = ['N', 'E', 'S', 'W'];
    const direction = POSSIBLE_MOVES[move];
    if (direction === 'N') {
      // Out of bounds north, move south
      if (position[0] === 0) {
        return [1, position[1]];
      }
      return [position[0] - 1, position[1]];
    }

    if (direction === 'E') {
      // Out of bounds east, move west
      if (position[1] === FARM_SIZE) {
        return [position[0], position[1] - 1];
      }
      return [position[0], position[1] + 1];
    }

    if (direction === 'S') {
      // Out of bounds south, move north
      if (position[0] === FARM_SIZE) {
        return [FARM_SIZE - 1, position[1]];
      }
      return [position[0] + 1, position[1]];
    }

    if (direction === 'W') {
      if (position[1] === 0) {
        // Out of bounds west, move east
        return [position[0], 1];
      }
      return [position[0], position[1] - 1];
    }
  }

  updateDecay = id => {
    const rabbits = this.state.rabbits;
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    if (rabbit) {
      rabbit.fitness -= 1;

      // Kanskje heller sette en props dying/dead
      // så kan vi vise en gravstein eller scull i 0.5 sek før den fjernes
      // ha en funksjon remove dead, som fjerner alle de døde

      if (rabbit.fitness <= 0) {
        this.killRabbit(rabbit);
      } else {
        rabbits[index] = rabbit;
        this.setState({ rabbits });
      }
    }
  };

  killRabbit = rabbit => {
    const rabbits = this.state.rabbits;
    var indexOfDeadRabbit = rabbits.indexOf(rabbit);
    rabbits.splice(indexOfDeadRabbit, 1);
    this.setState({ rabbits });
  };

  render() {
    return (
      <FarmContext.Provider
        value={{
          rabbits: this.state.rabbits,
          fight: this.state.fight,
          events: this.state.events,
          updatePosition: this.updatePosition,
          updateDecay: this.updateDecay,
          positions: this.state.positions,
          killRabbit: this.killRabbit
        }}
      >
        <button className="btn-legg-til top-center" onClick={this.addRabbit}>
          Legg til
        </button>
        {this.props.children}
      </FarmContext.Provider>
    );
  }
}
