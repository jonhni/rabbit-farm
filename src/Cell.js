import React, { Component } from 'react';
import Rabbit from './entities/Rabbit';
import { FarmContext } from './Context/FarmContext';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.x = props.position.x;
    this.y = props.position.y;
  }

  state = { rabbits: [] };

  isOccupied = rabbits => {
    const presentRabbits = rabbits
      .filter(rabbit => rabbit.position === `${this.x},${this.y}`);
    return presentRabbits;
  };

  setRabbits = rabbits => {
    this.setState({ rabbits: [...rabbits] });
  };

  render() {
    return (
      <FarmContext.Consumer>
        {({ rabbits, carrots, updatePosition, updateDecay }) => {
          return (
            <div className="cell">
              {this.isOccupied(rabbits).map(rabbit => {
                return (
                  <Rabbit
                    key={rabbit.id}
                    position={[this.x, this.y]}
                    rabbit={rabbit}
                    updatePosition={updatePosition}
                    updateDecay={updateDecay}
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
