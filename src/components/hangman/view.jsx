import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../../components';
import { defaultProps } from './cfg.js';

export default class Hangman extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    mystery:  PropTypes.string
  };

  render() {
    return (
      <Panel id="hangman">{this.props.mystery}</Panel>
    );
  }
}
