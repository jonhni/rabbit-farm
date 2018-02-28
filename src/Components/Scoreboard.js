import React, { Component } from 'react';
import { FarmContext } from '../Context/FarmContext';

export default class Scoreboard extends Component {
  render() {
    return (
      <FarmContext.Consumer>
        {({ rabbits, carrots, updatePosition, updateDecay, fight }) => {
          return (
            <div className="center-right">
              {rabbits.map(rabbit => {
                return (
                  <div key={rabbit.id} className="rabbit-card">
                    <h3>{`${rabbit.name} 🐐`}</h3>
                  </div>
                );
              })}
            </div>
          );
        }}
      </FarmContext.Consumer>
    );
  }
}
