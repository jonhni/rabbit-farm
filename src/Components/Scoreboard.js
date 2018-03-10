import React, { Component } from 'react';
import { FarmContext } from '../Context/FarmContext';

export default class Scoreboard extends Component {
  render() {
    return (
      <FarmContext.Consumer>
        {({ rabbits, carrots, updatePosition, updateDecay, fight }) => {
          return (
            <div className="center-right">
              {rabbits
                .sort((a, b) => {
                  return b.fightsWon - a.fightsWon > 0;
                })
                .map(rabbit => {
                  return (
                    <div key={rabbit.id} className="rabbit-card">
                      <h3>{`${rabbit.name} 🐐 ${rabbit.fitness} ❤️`}</h3>
                      <p>{`Fights won: ${rabbit.fightsWon}`}</p>
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
