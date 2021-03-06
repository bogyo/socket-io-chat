import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/stylesheets/carousel.css';

function touchX(event) {
  // get where to touch X
  return event.touches[0].clientX;
}

function touchY(event) {
  // get where to touch Y
  return event.touches[0].clientY;
}


export default class Carousel extends PureComponent {
  constructor(){
      super();
      this.state = {
        touchStarted: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        swipeOutBounded: false
      }
      this.tapTolerance = 10;
      this.swipeTolerance = 30;
    }


  handleTouchStart = (event) => {
    if (this.state.touchStarted) {
      // get img, then exit
        return;
    }

    // touch in progress
    this.setState({touchStarted: true});

    // detect wwhere it is
    this.setState({startX: touchX(event)});
    this.setState({startY: touchY(event)});

    // start vector
    this.setState({currentX: 0 });
    this.setState({currentY: 0 });
    };

    handleTouchMove = (event) => {
      // detect wwhere it is
      this.setState({currentX: touchX(event) });
      this.setState({currentY:  touchY(event) });
    };

    handleTouchCancel = () => {
      // onCancel need to reset
      this.setState({ touchStarted: false, swipeOutBounded: true });
      this.setState({ startX: 0, startY: 0 });
    };

    handleTouchEnd = (event) => {
      // when touch ends
      this.setState({touchStarted: false });

      if (!this.state.swipeOutBounded) {
        let direction;

        if (Math.abs(this.state.startX - this.state.currentX) < this.state.swipeOutBounded) {
            direction = this.state.startY > this.state.currentY ? "top" : "bottom";

        } else {
            direction = this.state.startX > this.state.currentX ? "left" : "right";
        }

        if (direction === 'left'){
            this.props.next();
        } else {
          this.props.previous();
        }
    }
    };

  render() {
    const { img } = this.props;
    return (
      <div className="Carousel"
        onTouchStart = {this.handleTouchStart}
        onTouchMove = {this.handleTouchMove}
        onTouchCancel = {this.handleTouchCancel}
        onTouchEnd = {this.handleTouchEnd}>
        <img src={img} alt='alt' />
      </div>
    );
  }
}

Carousel.propTypes = {
  img: PropTypes.string.isRequired
};
