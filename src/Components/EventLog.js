import React, { Component } from 'react';
import { FarmContext } from '../Context/FarmContext';
import Chat from './Chat';
export default class EventLog extends Component {
  render() {
    return (
      <FarmContext.Consumer>
        {({ events }) => {
          return (
            <div className="center-left">
              {events.map(event => {
                return (
                  <div key={event.timestamp} className="event-card">
                    <h3>{`${event.winner.name} 🐐 ️ 
                        defeated ${event.looser.name} 🐐`}</h3>
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
