import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/stylesheets/photoSettings.css';

export default class PhotoSettings extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      photoSettings:this.props.photoSettings
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
      console.log(nextProps);
      this.setState({ photoSettings: nextProps.photoSettings });
  }


  handleInputChange(event){
    //console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;

    if(value) {
      if (name === 'width') {
        const originalHeight = this.state.photoSettings.height;

        this.setState({ photoSettings: {width: value, height: originalHeight } });
      } else {
        const originalWidth = this.state.photoSettings.width;

        this.setState({ photoSettings: {width: originalWidth, height: value } });
      }
    }
  }

  handleClick(event){
    event.preventDefault();

    const { photoSettings } = this.state;
    const { onSettingsChange } = this.props;

    if(photoSettings) {
      onSettingsChange(photoSettings);
      this.setState({photoSettings: ''});
    }
  }

  render() {
    const { width, height} = this.state.photoSettings;

    console.log(this.state.photoSettings);


    return (
      <div className="PhotoSettings">
        <p>Resolution of your images</p>
          <div className="formwrapper">
            <form>
            <div className="row">
              <p>X(Width): <b className="dymensions">{width}</b></p>
              <label>Change X(Width) of photos: </label>
                <input
                 name="width"
                 type="range"
                 min="0" max="1920"
                 value={width}
                 step="1"
                 onChange={this.handleInputChange} />

              <button className="btn" onClick={this.handleClick}>Save</button>
            </div>
            <div className="row">
              <p>Y(Height): <b className="dymensions">{height}</b></p>
              <label>Change Y(Height) of photos: </label>
                <input
                 name="height"
                 type="range"
                 min="0" max="1920"
                 value={height}
                 step="1"
                 onChange={this.handleInputChange} />
              <button className="btn" onClick={this.handleClick}>Save</button>
            </div>
            </form>
          </div>
      </div>
    );
  }

}

PhotoSettings.propTypes = {
  photoSettings: PropTypes.object.isRequired
};
