import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/stylesheets/accordion.css';

const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
}

export default class Accordion extends PureComponent {
  constructor(props){
      super(props);
      this.state = {
        active: this.props.active

      }
      this.isActive = this.isActive.bind(this);
  }

  isActive(){
    this.setState({
      active: !this.state.active
    });
  }


  render() {
    const style = this.state.active ? styles.active : styles.inactive;

    return (
      <section className="Accordion">
        <a onClick={this.isActive}>
          {this.props.title}
        </a>
        <div style={style}>
          {this.props.details}
        </div>
      </section>
    );
  }
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired
};
