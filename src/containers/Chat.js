import React, { Component } from 'react';

import MessageList from '../components/MessageList';
import MessageSender from '../components/MessageSender';

import '../styles/stylesheets/chat.css';

class Chat extends Component {
  componentWillMount(){
    this.props.readMessages();
  }

  render() {
    return (
      <div className="Chat">
        chat tab
        <MessageList
          messages={this.props.messages}
          user={this.props.user} />

        <MessageSender
          handleSend={this.props.handleSend} />
      </div>
    );
  }
}

export default Chat;
