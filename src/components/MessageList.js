import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/stylesheets/messagelist.css';

export default class MessageList extends PureComponent {

  render() {
    const { messages, user } = this.props;

    const ownMessage = (message, index) => {
      return <div key={index} className="messageWrapperOwn">
        <div className="ownMessage">{message.message}</div>
        </div>
    };

    const incomingMessages = (message, index) => {
      return (
        <div key={index} className="messageWrapperIncoming">
          <div className="incomingMessage">{message.message}<br />
            <span className="nickName">{message.user}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="MessageList">
        { messages.map( (message, index) => {
          if (message.user === user) {
            return ownMessage(message, index);
          } else {
            return incomingMessages(message, index);
          }
        })}
      </div>
    );
  }
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
}
