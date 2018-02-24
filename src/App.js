import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rabbit from './entities/Rabbit';
import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {/* <Rabbit position={[0,0]}/> 
          <Rabbit position={[1,2]}/> 
          <Rabbit position={[2,3]}/> 
          <Rabbit position={[1,3]}/> 
          <Rabbit position={[4,4]}/>  */}
        </div>
        <Grid />
      </div>
    );
  }
}

export default App;
