import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultProps } from './cfg.js';

export default class Hangman extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    mystery:  PropTypes.string
  };

  render() {
    return (
      <div id="hangman">{this.props.mystery}</div>
    );
  }
}
