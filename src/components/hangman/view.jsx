import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Input, Label, Panel } from '../../components';
import { actions, defaultProps } from './cfg.js';

export default class Hangman extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    alphabet: PropTypes.array,
    labels: PropTypes.object,
    maxRounds: PropTypes.number,
    mystery:  PropTypes.string,
    renderKeyboard: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      activeLetters: null,
      guessing: '',
      guessed: ''
    };

    this.makeLetters = props => (
      props.alphabet.reduce((acc, letter) => {
        acc[letter.toLowerCase()] = false;
        return acc;
      }, {}));

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
          activeLetters: this.makeLetters(this.props),
          guessing: '',
          guessed: ''
        });
      case actions.GUESS_SUBMIT:
        return this.setState({ guessed: value });
      case actions.LETTER_SELECT:
        return this.setState((prevState, props) => {
          const newVal = { [name]: true };
          return {
            activeLetters: {
              ...prevState.activeLetters,
              ...newVal
            }
          };
        });
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

 /**
  * render methods ...
  * renderKeyboard - called from <Panel> props render
  */
  renderKeyboard = (childId, childProps) => {
    const { alphabet, labels, maxRounds } = this.props;
    return this.props.renderKeyboard({
      handleAction: this.handleAction,
      alphabet, labels, maxRounds,
      ...childProps,
      ...this.state
    });
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
          <Panel id="keyboard" render={this.renderKeyboard} />
        </Container>
      </div>
    );
  }
}
