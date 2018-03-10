import React, { Component } from 'react';
import { rabbits } from '../utils/rabbitGenerator';
import {
  decideOutcome,
  generateEvent,
  determineCollidingRabbits,
  getNewPosition
} from '../utils/eventHelpers';
import { Subject } from 'rxjs/Subject';

const defaultState = {
  rabbits: [],
  events: []
};
const eventStream = new Subject();

export const FarmContext = React.createContext(defaultState);

export default class FarmStore extends Component {
  state = defaultState;
  rabbitGenerator = rabbits();

  addRabbit = () => {
    const rabbits = [...this.state.rabbits];
    const rabbit = this.rabbitGenerator.next().value;

    this.setState({ rabbits: [...rabbits, rabbit] });
  };

  subscription = eventStream.subscribe(({ position, id }) =>
    this.updatePosition(position, id)
  );

  pushEvent = event => eventStream.next(event);

  updatePosition = (position, id) => {
    const newPos = getNewPosition(position);
    const rabbits = [...this.state.rabbits].map(
      rabbit =>
        rabbit.id === id
          ? { ...rabbit, position: `${newPos[0]},${newPos[1]}` }
          : rabbit
    );
    const collidingRabbits = determineCollidingRabbits(rabbits);
    this.setState({ rabbits });
    if (collidingRabbits.length > 1) {
      this.handleColission(collidingRabbits);
    }
  };

  handleColission(collidingRabbits) {
    const [winner, looser] = decideOutcome(collidingRabbits);
    const events = [...this.state.events];
    const event = generateEvent(winner, looser, 'fight');
    this.setState({ events: [...events, event] });
    this.killRabbit(looser);
  }

  updateDecay = id => {
    const rabbits = [...this.state.rabbits]
      .map(
        rabbit =>
          rabbit.id === id
            ? { ...rabbit, fitness: (rabbit.fitness -= 1) }
            : rabbit
      )
      .filter(rabbit => rabbit.fitness > 0);
    this.setState({ rabbits });
  };

  killRabbit = rabbit => {
    const rabbits = [...this.state.rabbits].filter(
      curr => curr.id !== rabbit.id
    );
    this.setState({ rabbits });
  };

  render() {
    return (
      <FarmContext.Provider
        value={{
          rabbits: this.state.rabbits,
          events: this.state.events,
          updateDecay: this.updateDecay,
          positions: this.state.positions,
          pushEvent: this.pushEvent,
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
