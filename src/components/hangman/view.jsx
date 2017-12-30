import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Input, Label, Panel } from '../../components';
import { actions, defaultProps } from './cfg.js';

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

  componentDidMount() {
    this.handleAction({
      action: actions.GAME_BEGIN
    });
  }


 /**
  * event methods ...
  * handleAction - handles actions changing state
  * handleInput - handles controlled inputs changing state
  */
  handleAction = e => {
    const { action, name, value } = e;
    switch(action) {
      case actions.GAME_BEGIN:
        return this.setState({
          guessing: '',
          guessed: ''
        });
      case actions.GUESS_SUBMIT:
        return this.setState({ guessed: value });
      default:
        break;
    }
  }

  handleInput = e => {
    const { name, value } = e.target;
    return this.setState((prevState, props) => ({
      [name]: value
    }));
  }

  render() {
    const { props, state, handleAction, handleInput } = this;
    return (
      <div className="layout" id="hangman">
        <Container flex="row" id="hangman-main">
          <Panel id="guesses">
            <Label text={props.mystery} />
            <Input name="guessing" handleChange={handleInput} value={state.guessing} />
            <Button name="guessed" handleAction={handleAction} value={state.guessing}
              action={actions.GUESS_SUBMIT} text="makes a guess" />
          </Panel>
        </Container>
      </div>
    );
  }
}
