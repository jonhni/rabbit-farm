import React, { Component } from 'react';
import Rabbit from './entities/Rabbit';
import { FarmContext } from './Context/FarmContext';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.x = props.position.x;
    this.y = props.position.y;
    this.state = {
      rabbit: props.rabbit
    };
  }

  isOccupied = (rabbits) => {
    return rabbits.indexOf(`${this.x},${this.y}`) > -1;
  };

  setRabbit = rabbit => {
    this.rabbit = rabbit;
  };

  render() {
    return (
      <FarmContext.Consumer>
        {({ rabbits, carrots, updatePosition }) => {
          return (
            <div className="cell">
              {this.isOccupied(rabbits) ? (
                <Rabbit position={[this.x, this.y]} updatePosition={updatePosition}/>
              ) : null}
              {this.props.position.x},
              {this.props.position.y}
            </div>
          );
        }}
      </FarmContext.Consumer>
    );
  }
}
