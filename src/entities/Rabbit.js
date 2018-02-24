import React, { Component } from 'react';

class Rabbit extends Component {
  constructor(props) {
    super(props); 
    this.state = {rabbit: props.rabbit, position: props.position}
  }

  componentDidMount() {
    const tick = setInterval(() => this.updateSimulationState(), 1000);

    this.setState({ tick });
  }

  componentWillUnmount() {
    clearInterval(this.state.tick);
  }

  updateSimulationState() {
    this.move();
    this.fitnessDecay();
  }

  move() {
    this.props.updatePosition(this.state.position, this.state.rabbit.id);

  }

  fitnessDecay() {
    this.props.updateDecay(this.state.rabbit.id);
  }

  render() {
    return (
      <div>
        {this.state.rabbit.fitness}
        {this.props.rabbit.gender > 0.5 ? "♂" : "♀"}
        🐰
      </div>
    );
  }
}

export default Rabbit;
