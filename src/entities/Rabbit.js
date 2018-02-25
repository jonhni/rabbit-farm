import React, { Component } from 'react';

class Rabbit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rabbit: props.rabbit,
      position: props.position,
      fight: props.fight
    };
  }

  componentDidMount() {
    const tick = setInterval(() => this.updateSimulationState(), 1000);
    this.setState({ tick, fight: this.props.fight });
  }

  componentDidUpdate() {
    if (this.props.fight !== this.state.fight) {
      this.setState({ fight: this.props.fight });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.tick);
  }

  updateSimulationState() {
    if (!this.state.fight) {
      this.move();
      this.fitnessDecay();
    }
  }

  move() {
    this.props.updatePosition(this.state.position, this.state.rabbit.id);
  }

  fitnessDecay() {
    this.props.updateDecay(this.state.rabbit.id);
  }

  render() {
    const male = this.props.rabbit.gender > 0.5;
    // "♂" : "♀"

    return (
      <div className="rabbit">
        <span className={male ? 'rabbit-name-male' : 'rabbit-name-female'}>
          {this.props.rabbit.name}
        </span>
        <span className="rabbit-head">🐐</span>
        <span className="rabbit-fitness">{this.state.rabbit.fitness}❤️</span>
      </div>
    );
  }
}

export default Rabbit;
