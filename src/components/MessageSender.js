import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/stylesheets/messagesender.css';

const defaultValue = 'Reply...';

export default class MessagSender extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      value: defaultValue
    }

    this.handleFocus = this.handleFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFocus(){
    if(this.state.value === defaultValue) {
      this.setState({value: ''});
    }
  }

  handleInputChange(event){
    const value = event.target.value;

    if (value) {
      this.setState({ value: value });
    }
  }

  handleClick(event){
    event.preventDefault();
    const { value } = this.state;
    const { handleSend } = this.props;

    if(value) {
      handleSend(value);
      this.setState({value: ''});
    }
  }

  render() {
    const { value } = this.state;

    return  (
      <div className="Messagesender">
        <div className="formwrapper">
          <form>
          {/*TODO: label here if screenReaders support if needed */}
            <input
              className="txtinput"
              type="text"
              value={value}
              onFocus={this.handleFocus}
              onChange={this.handleInputChange} />
            <button className="btn" onClick={this.handleClick}>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

MessagSender.propTypes = {
  handleSend: PropTypes.func.isRequired
}
