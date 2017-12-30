import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Input, Label, Panel } from '../../components';
import { defaultProps } from './cfg.js';

export default class Hangman extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    mystery:  PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      guessing: '',
      guessed: ''
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    return this.setState((prevState, props) => ({
      [name]: value
    }));
  }

  render() {
    const { props, state, handleInput } = this;
    return (
      <div className="layout" id="hangman">
        <Container flex="row" id="hangman-main">
          <Panel id="guesses">
            <Label text={props.mystery} />
            <Input name="guessing" handleChange={handleInput} handleBlur={handleInput} value={state.guessing} />
            <Button name="guessed" text="makes a guess" />
          </Panel>
        </Container>
      </div>
    );
  }
}
