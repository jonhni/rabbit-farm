import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rabbit from './entities/Rabbit';
import Grid from './Grid';
import FarmStore, { FarmContext } from './Context/FarmContext';
class App extends Component {
  render() {
    return (
      <div className="App"> 
        <h1 className="App-title"></h1>
        <div className="App-intro" />
        <FarmStore>
          <Grid />
        </FarmStore>
      </div>
    );
  }
}

export default App;
