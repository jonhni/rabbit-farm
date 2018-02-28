import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import Scoreboard from './Components/Scoreboard';
import EventLog from './Components/EventLog';
import FarmStore from './Context/FarmContext';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title" />
        <div className="App-intro" />
        <div className="container">
          <FarmStore>
            <Grid />
            <Scoreboard />
            <EventLog />
          </FarmStore>
        </div>
      </div>
    );
  }
}

export default App;
