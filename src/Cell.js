import React, { Component } from 'react';
import Rabbit from './entities/Rabbit';
export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.x = props.position.x;
    this.y = props.position.y;
    this.state = {
      rabbit: props.rabbit
    }
  }
  isOccupied = () => {
    return !this.rabbit;
  }

  setRabbit = (rabbit) => {
    this.rabbit = rabbit;
  }

  render() {
    return (
    <div className='cell'>
        {/* {this.state.rabbit ? <Rabbit position={[this.x,this.y]} /> : null} */}
        {this.props.position.x}
        {this.props.position.y}
    </div>
    )
  }

}
