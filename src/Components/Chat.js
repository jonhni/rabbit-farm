import PropTypes from 'prop-types';
import React from 'react';

class Chat extends React.Component {

  getEventText = (event) => {
    if(event.type === 'fight') {
      const message = `${event.winner.name} drepte ${event.looser.name} ` 
      return message;
    }
    
  }

  getEventResponse = (event) => {
    return `Bra jobba ${event.winner.name}`
  }

  getEventLog = () => this.props.events.map((event, idx) => (
    <span key={`${event.type}-${idx}-response`}>
    <span
      
      className={false || event.userName === this.props.userName ? 'ownMessage' : 'theirMessage'}
    >
      <span className={ false ||  event.userName ===this.props.userName  ? 'ownText' : 'theirText'}>
        {this.getEventResponse(event)}
      </span>
    </span>
    <span
      key={`${event.type}-${idx}`}
      className={true || event.userName === this.props.userName ? 'ownMessage' : 'theirMessage'}
    >
      <span className={ true ||  event.userName ===this.props.userName  ? 'ownText' : 'theirText'}>
        {this.getEventText(event)}
      </span>
    </span>

    </span>
    )).reverse();

  render() {
    return (
      <div className='chat'>
        <div className='chatMessageContainer scroll'>
          <div className=''>
            {this.getEventLog()}
          </div>
        </div>
      </div>

    );
  }
}


export default Chat;

