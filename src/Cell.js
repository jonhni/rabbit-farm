import React, { Component } from 'react';
import Rabbit from './entities/Rabbit';
import { FarmContext } from './Context/FarmContext';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.x = props.position.x;
    this.y = props.position.y;
    this.hasSnack = (props.position.x === 1 && props.position.y === 1) || (props.position.x === 4 && props.position.y === 3) || (props.position.x === 2 && props.position.y === 0) || (props.position.x === 5 && props.position.y === 0) || (props.position.x === 3 && props.position.y === 5) || (props.position.x === 4 && props.position.y === 0) || (props.position.x === 0 && props.position.y === 5);
  }

  state = { rabbits: [] };

  isOccupied = rabbits => {
    const presentRabbits = rabbits
    .filter(rabbit => rabbit.position === `${this.x},${this.y}`);
    if(this.hasSnack && presentRabbits[0]) {
      presentRabbits[0].fitness = 100;
      this.hasSnack = false;
    }
    return presentRabbits;
  };

  setRabbits = rabbits => {
    this.setState({ rabbits: [...rabbits] });
  };

  render() {

    return (
      <FarmContext.Consumer>
        {({ rabbits, carrots, updatePosition, updateDecay, fight }) => {
          return (
            <div className="cell">
            {this.hasSnack && <span className="snack">🍔</span>}
              {this.isOccupied(rabbits).map(rabbit => {
                return (
                  <Rabbit
                    key={rabbit.id}
                    position={[this.x, this.y]}
                    rabbit={rabbit}
                    updatePosition={updatePosition}
                    updateDecay={updateDecay}
                    fight={fight}
                  />
                );
              })}
              {/* {this.props.position.x},
              {this.props.position.y} */}
            </div>
          );
        }}
      </FarmContext.Consumer>
    );
  }
}
