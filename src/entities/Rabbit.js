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
  
  componentDidMount() {
    setInterval(() => this.fitnessDecay(), 1000);
  }

  fitnessDecay() {
    this.setState((prev) => {
      return ({fitness: prev.fitness-1});
    })
  }

  render () {
    return (
    <div>
      {this.state.fitness}
      🐰
    </div>);
  }
}

export default Rabbit;