import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Panel } from '../../components';
import { actions, defaultProps } from './cfg.js';
import * as setNextState from './state';

export default class Hangman extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    alphabet: PropTypes.array,
    display: PropTypes.shape({
      gallowsOn: PropTypes.bool,
      roundToggleOn: PropTypes.bool
    }),
    labels: PropTypes.object,
    maxRounds: PropTypes.number,
    mysteryWord: PropTypes.string,
    renderPanel: PropTypes.shape({
      footer: PropTypes.func,
      gallows: PropTypes.func,
      guesses: PropTypes.func,
      keyboard: PropTypes.func,
      mystery: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      activeLetter: null,
      activeLetters: null,
      activeRound: null,
      guessing: '',
      guessed: '',
      result: null
    };

    this.makeLetters = props => (
      props.alphabet.reduce((acc, letter) => {
        acc[letter.toLowerCase()] = false;
        return acc;
      }, {}));

    this.mapChildProps = (nextProps, nextState) => ({
      labels: nextProps.labels,
      handleAction: this.handleAction,
      handleInput: this.handleInput,
      render: this.renderPanel
    });

    this.mapGameProps = (nextProps, nextState) => {
      const { maxRounds } = nextProps;
      const { activeLetter, activeLetters, activeRound, result } = nextState;

      const getActiveKeyboard = () =>
        !result && !activeLetter && activeRound<maxRounds;

      const getActiveGuesses = () =>
        !result && activeLetter && activeRound<=maxRounds;

      const getActiveKeys = () =>
        nextProps.alphabet.reduce((keys, name) => {
        keys.push({ name,
          disabled: !getActiveKeyboard()||activeLetters[name]
        });
        return keys;
      }, []);

      return {
        activeKeys: getActiveKeys(),
        activeKeyboard: getActiveKeyboard(),
        activeGuesses: getActiveGuesses(),
        maxRounds,
        ...nextState
      }
    };

  }

  componentDidMount() {
    this.handleAction({
      action: actions.GAME_BEGIN
    });
  }

  componentWillUpdate(nextProps, nextState) {
    this.childProps = this.mapChildProps(nextProps, nextState);
    this.gameProps = this.mapGameProps(nextProps, nextState);
  }

 /**
  * event methods ...
  * handleAction - handles actions changing state
  * handleInput - handles controlled inputs changing state
  */
  handleAction = e => {
    const { action, name, value } = e;

    const {
      onGameBegin, onGameResult, onGuessSubmit, onLetterSelect
    } = setNextState;

    switch(action) {
      case actions.GAME_BEGIN:
        return this.setState((prevState, props) => {
          const newVal=this.makeLetters(props);
          return onGameBegin(prevState, props, newVal);
        });
      case actions.GAME_RESTART:
        return this.setState((prevState, props) => {
          const newVal=this.makeLetters(props);
          return onGameBegin(prevState, props, newVal);
        });
      case actions.GUESS_SUBMIT:
        return this.setState((prevState, props) => {
          if(value.toLowerCase()===props.mysteryWord.toLowerCase()) {
            return onGameResult(prevState, props, actions.GAME_WON);
          } else if(prevState.activeRound >= props.maxRounds) {
            return onGameResult(prevState, props, actions.GAME_LOST);
          } else {
            return onGuessSubmit(prevState, props, value);
          }
        });
      case actions.LETTER_SELECT:
        return this.setState((prevState, props) => {
          return onLetterSelect(prevState, props, {
            [name]: true
          });
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
  * renderPanel - called from <Panel> props render
  */
  renderPanel = (id, childProps) => {
    const { gameProps } = this;
    const { activeGuesses, activeKeyboard } = gameProps;
    const { gallowsOn, roundToggleOn } = this.props.display;

    if(id==='gallows' && !gallowsOn) {
      return null;
    } else if(id==='guesses'&&roundToggleOn&&!activeGuesses) {
      return null;
    } else if(id==='keyboard'&&roundToggleOn&&!activeKeyboard) {
      return null;
    };

    return this.props.renderPanels[id]({
      ...childProps,
      ...gameProps
    });
  };

  render() {
    const { childProps } = this;
    return (
      <div className="layout" id="hangman">
        <Container flex={true} flexItem={'1 1 100%'}>
          <Panel id="mystery"  {...childProps} />
          <Panel id="gallows"  {...childProps} />
          <Panel id="guesses"  {...childProps} />
          <Panel id="keyboard" {...childProps} />
        </Container>
        <Container flex={true} flexItem={'none'}>
          <Panel id="footer"   {...childProps} />
        </Container>
      </div>
    );
  }
}
