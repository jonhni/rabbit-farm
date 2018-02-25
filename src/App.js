import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import FarmStore from './Context/FarmContext';
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
