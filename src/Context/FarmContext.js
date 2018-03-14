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

  subscription = eventStream.subscribe(({ position, id }) =>
    this.handleTick(position, id)
  );

  pushEvent = event => eventStream.next(event);

  addRabbit = () => {
    const rabbits = [...this.state.rabbits];
    const rabbit = this.rabbitGenerator.next().value;
    this.setState({ rabbits: [...rabbits, rabbit] });
  };

  handleTick = (position, id) => {
    let rabbits = [...this.state.rabbits];
    rabbits = this.checkCollision(
      this.updatePositionAndFitness(position, id, rabbits)
    );
    this.setState({ rabbits });
  };

  updatePositionAndFitness = (position, id, rabbits) => {
    const newPos = getNewPosition(position);
    return rabbits
      .map(
        rabbit =>
          rabbit.id === id
            ? {
                ...rabbit,
                fitness: rabbit.fitness - 1,
                position: `${newPos[0]},${newPos[1]}`
              }
            : rabbit
      )
      .filter(rabbit => rabbit.fitness > 0);
  };

  checkCollision = rabbits => {
    const collidingRabbits = determineCollidingRabbits(rabbits);
    if (collidingRabbits.length > 1) {
      return this.handleCollision(rabbits, collidingRabbits);
    }
    return rabbits;
  };

  handleCollision = (rabbits, collidingRabbits) => {
    const [winner, looser] = this.getFightOutcome(collidingRabbits);
    return rabbits.reduce((acc, curr) => {
      return curr.id === winner.id
        ? [...acc, { ...curr, fightsWon: curr.fightsWon + 1 }]
        : curr.id === looser.id ? [...acc] : [...acc, curr];
    }, []);
  };

  getFightOutcome = collidingRabbits => {
    const [winner, looser] = decideOutcome(collidingRabbits);
    const events = [...this.state.events];
    const event = generateEvent(winner, looser, 'fight');
    this.setState({ events: [event, ...events] });
    return [winner, looser];
  };

  render() {
    return (
      <FarmContext.Provider
        value={{
          rabbits: this.state.rabbits,
          events: this.state.events,
          positions: this.state.positions,
          pushEvent: this.pushEvent
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
