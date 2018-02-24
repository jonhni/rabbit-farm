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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro" />
        <FarmStore>
          <Grid />
        </FarmStore>
      </div>
    );
  }
}

export default App;
