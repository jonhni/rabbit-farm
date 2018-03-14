import React, { Component } from 'react';

class Rabbit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rabbit: props.rabbit,
      position: props.position,
    };
  }

  componentDidMount() {
    const tick = setInterval(() => this.updateSimulationState(), 1000);
    this.setState({ tick });
  }

  componentWillUnmount() {
    clearInterval(this.state.tick);
  }

  updateSimulationState() {
    this.handleTick();
  }

  handleTick() {
    this.props.pushEvent({position: this.state.position, id: this.state.rabbit.id});
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
