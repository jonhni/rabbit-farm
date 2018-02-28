import React, { Component } from 'react';
import { FarmContext } from '../Context/FarmContext';

export default class EventLog extends Component {
  render() {
    return (
      <FarmContext.Consumer>
        {({ events }) => {
          return (
            <div className="center-left">
              {events.map(event => {
                return (
                  <div key={event.timestamp} className="rabbit-card">
                    <h3>{`${event.winner.name} 🐐 ${event.winner.fitness} ❤️ 
                        killed ${event.looser.name} 🐐 ${
                      event.looser.fitness
                    } ❤️ at ${event.timestamp}`}</h3>
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
