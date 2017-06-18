import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import io from 'socket.io-client';

import Chat from './containers/Chat';
import Photos from './containers/Photos';
import Settings from './containers/Settings';

import './styles/stylesheets/app.css';

const socket = io('http://localhost:8081');

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: '',
      photoSettings: {width: 600, height: 500},
      messages: [],
      unread: false
    }

    // use binding to keep this dynamic
    // not using arrow functions here for porpuse

    this.handleSend = this.handleSend.bind(this);
    this.readMessages = this.readMessages.bind(this);
    this.handleChatSettingsChange = this.handleChatSettingsChange.bind(this);
    this.handlePhotoSettingsChange = this.handlePhotoSettingsChange.bind(this);
  }

  componentDidMount() {
    socket.on('connect', function (data){

      //request a uniqe name if I not have one
      if(!this.state.user) {
        socket.emit('join', {user: this.state.user});
      }

      socket.on('setUserMame', (uniqueUserName) => {
        this.setState({ user: uniqueUserName });
      });

      socket.on('message', function(data) {
        const stateMessages = this.state.messages;

        if( data.user !== this.state.user) {
         const messages  = [
           ...stateMessages,
          data
         ];

         this.setState({ messages: messages, unread: true }, () => {
           this.unread = true;
         });
        };
      }.bind(this));
    }.bind(this));
  }

componentWillUnmount() {
    // TODO: do something, when user leave the chat
    // broadcast to others
    // unbind event listeners
    //socket.emit('leave chat', {user: this.state.user});
  }

handleChatSettingsChange(nickname){
  // set nickname to the new one
  // TODO: in a real application maybe useful to emit socket event to broadcast
  // the new name to the others.

  this.setState({ user: nickname });
}


handlePhotoSettingsChange(dimensions){
  // set photo dimensions to new
  this.setState({ photoSettings: dimensions });
}

handleSend(myMessage) {
   const stateMessages = this.state.messages;
   const newMessage = { message: myMessage, user: this.state.user }

   const messages  = [
    ...stateMessages,
    newMessage
   ];

   socket.emit('message', newMessage );
   this.setState({ messages: messages });
 }

  renderChat(){
    return <Chat
      settings={'settings'}
      user={this.state.user}
      messages={this.state.messages}
      handleSend={this.handleSend}
      readMessages={this.readMessages} />;
  }

  renderPhotos(){
    return <Photos settings={this.state.photoSettings} />;
  }

  renderSettings(){
    return <Settings
      photoSettings={this.state.photoSettings}
      chatSettings={this.state.user}
      handleChatSettingsChange={this.handleChatSettingsChange}
      handlePhotoSettingsChange={this.handlePhotoSettingsChange} />;
  }

  readMessages(){
    this.setState({unread: false})
  }

  render() {
   const unReadClass = this.state.unread === true && window.location.pathname !== '/' ? 'unread' : '';

    return (
      <div className="App">
        <Router>
          <section className="main">
            <header>
              <nav>
                <ul>
                  <li className={unReadClass}><NavLink to="/" className="link" activeClassName="active">Chat</NavLink></li>
                  <li><NavLink to="/photos" className="link"  activeClassName="active">Photos</NavLink></li>
                  <li><NavLink to="/settings" className="link" activeClassName="active">Settings</NavLink></li>
                </ul>
              </nav>
            </header>

            <Route exact path="/" render={()=>this.renderChat()} />
            <Route path="/photos" render={()=>this.renderPhotos()} />
            <Route path="/settings" render={()=>this.renderSettings()} />
            </section>
      </Router>
    </div>
    );
  }
}

export default App;
