import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Accordion from '../components/Accordion';
import PhotoSettings from '../components/PhotoSettings';
import ChatSettings from '../components/ChatSettings';

import '../styles/stylesheets/Settings.css';

class Settings extends Component {
  constructor(props){
    super(props);

      this.state = {
        chatSettings: this.props.chatSettings,
        photoSettings: this.props.photoSettings,
        active: this.props.active,
      }

      this.renderChat = this.renderChat.bind(this);

      this.onChatSettingsChange = this.onChatSettingsChange.bind(this);
      this.onPhotoSettingsChange = this.onPhotoSettingsChange.bind(this);
    }

    renderChat(chatSettings){
      const chat = {
        title: 'Chat settings',
        details: <ChatSettings chatSettings={chatSettings} />
      }
      return chat;
    }

  componentWillReceiveProps(nextProps){
     this.setState({chatSettings: nextProps.chatSettings });
     this.setState({photoSettings: nextProps.photoSettings });
  }

  onChatSettingsChange(setting){
    return this.props.handleChatSettingsChange(setting);
  }

  onPhotoSettingsChange(setting){
    return this.props.handlePhotoSettingsChange(setting);
  }


    render() {
      const {chatSettings, photoSettings} = this.state;

    return (
      <div className="Settings">
        <span>settings tab</span>
        <Accordion
          title={'Chat Settings'}
          details={<ChatSettings
          chatSettings={chatSettings}
          onSettingsChange={this.onChatSettingsChange } />} />
        <Accordion
          title={'Photo Settings'}
          details={<PhotoSettings
          photoSettings={photoSettings}
          onSettingsChange={this.onPhotoSettingsChange } />} />
      </div>
    );
  }
}

export default Settings;


Settings.propTypes = {
  chatSettings: PropTypes.string.isRequired,
  photoSettings: PropTypes.object.isRequired
}
