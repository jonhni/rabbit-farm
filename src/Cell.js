import React, { Component } from 'react';
import Rabbit from './entities/Rabbit';
import { FarmContext } from './Context/FarmContext';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.x = props.position.x;
    this.y = props.position.y;

    this.tick = setInterval(() => this.setSnack(), 5000);
    }
    
    state = { rabbits: [], hasSnack: Math.random() > 0.95 };
    
    componentWillUnmount() {
      clearInterval(this.tick); 
    }
    
    setSnack = () => {
      if(!this.state.hasSnack) {
        this.setState({
          hasSnack: Math.random() > 0.9
        })  
      }
    }

  isOccupied = rabbits => {
    const presentRabbits = rabbits
    .filter(rabbit => rabbit.position === `${this.x},${this.y}`);
    if(this.state.hasSnack && presentRabbits[0]) {
      presentRabbits[0].fitness = Math.min(presentRabbits[0].fitness + 30, 100);
      this.setState({
        hasSnack: false
      })
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
            {this.state.hasSnack && <span className="snack">🍔</span>}
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
