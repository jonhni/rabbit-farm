import React, { Component } from 'react';
import { FARM_SIZE } from '../constants';
import { rabbits } from '../utils/rabbitGenerator';
import ReactModal from 'react-modal';
const defaultState = {
  rabbits: [],
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
    const rabbits = this.state.rabbits;
    const rabbit = this.state.rabbits.find(rabbit => rabbit.id === id);
    const index = this.state.rabbits.indexOf(rabbit);
    const newPos = this.getNewPosition(position);
    rabbit.position = `${newPos[0]},${newPos[1]}`;
    rabbits[index] = rabbit;
    this.checkColission(rabbits);
    this.setState({ rabbits });
  };

  checkColission(rabbits) {
    const positions = {};
    rabbits.forEach(rabbit => {
      if (!positions[rabbit.position]) {
        positions[rabbit.position] = rabbit;
      } else {
        this.startFight();
        const looser = this.decideLooser(
          positions[rabbit.position],
          rabbit
        );
        this.killRabbit(looser);
      }
    });
  }

  decideLooser(rabbit1, rabbit2) {
    return Math.random() < 0.5 ? rabbit1 : rabbit2;
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

  startFight = () => {
    this.setState({ fight: true });
    //her må vi ta inn hvem som skal sloss og kanskje sette på state så modalen kan jobbe med infoen?
  };

  stopFight = () => {
    this.setState({ fight: false });
  };

  initiateFightTest = () => {
    setTimeout(() => this.stopFight(), 3000);
  };

  render() {
    return (
      <FarmContext.Provider
        value={{
          rabbits: this.state.rabbits,
          carrots: this.state.carrots,
          fight: this.state.fight,
          updatePosition: this.updatePosition,
          updateDecay: this.updateDecay,
          positions: this.state.positions,
          killRabbit: this.killRabbit
        }}
      >
        <ReactModal
          isOpen={this.state.fight}
          onAfterOpen={this.initiateFightTest}
          onRequestClose={this.stopFight}
          ariaHideApp={false}
        >
          <h1>MOORTAL KOMBAT</h1>
          <h2>current rabbits in simulation:</h2>
          {this.state.rabbits.map(rabbit => {
            return <h3 key={rabbit.id}>{rabbit.name}</h3>;
          })}
        </ReactModal>
        <button className="btn-legg-til" onClick={this.addRabbit}>
          Legg til
        </button>
        <button className="btn-legg-til" onClick={this.startFight}>
          start Fight
        </button>
        <button className="btn-legg-til" onClick={this.stopFight}>
          Stop Fight
        </button>
        {this.props.children}
      </FarmContext.Provider>
    );
  }
}
