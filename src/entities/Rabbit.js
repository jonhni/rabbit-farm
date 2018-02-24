import React, { Component } from 'react';


class Rabbit extends Component {
  constructor(props) {
    super(props)
    const defaultState = {
      name: `Bob-${Date.now()}`,
      fitness: Math.floor(Math.random() * 100),
      gender: Math.round(Math.random()) > 0 ? 'Boi' : 'Gurrl',
      position: this.props.position
    }
    this.state = defaultState
  }
  

  render () {
    return (
    <div>
      {this.state.fitness}
      🐰
      {this.state.name}
      {this.state.gender}
      {this.state.position}
    </div>);
  }
}

export default Rabbit;