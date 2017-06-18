import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/stylesheets/chatSettings.css';

export default class ChatSettings extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      chatSettings:this.props.chatSettings
    }
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
      console.log(nextProps);
      this.setState({ chatSettings: nextProps.chatSettings });
  }

  handleFocus(){
    //console.log('asdadw');

    if (this.state.chatSettings === this.props.chatSettings) {
      this.setState({chatSettings: ''});
    }

  }

  handleInputChange(event){
    const value = event.target.value;

    if (value) {
      this.setState({ chatSettings: value });
    }
  }

  handleClick(event){
    event.preventDefault();

    const { chatSettings } = this.state;
    const { onSettingsChange } = this.props;

    if(chatSettings) {
      onSettingsChange(chatSettings);
      this.setState({chatSettings: ''});
    }
  }

  render() {
    const { chatSettings } = this.state;

    return (
      <div className="ChatSettings">
        <p>Your nickName: <b className="nickname">{this.props.chatSettings}</b>< br />
          Would you like to change it?
        </p>
          <div className="formwrapper">
            <form>
            {/*TODO: label here if screenReaders support if needed */}
              <input
                className="txtinput"
                type="text"
                value={chatSettings}
                onFocus={this.handleFocus}
                onChange={this.handleInputChange} />
              <button className="btn" onClick={this.handleClick}>Save</button>
            </form>
          </div>
      </div>
    );
  }
}


ChatSettings.propTypes = {
  chatSettings: PropTypes.string.isRequired
};
