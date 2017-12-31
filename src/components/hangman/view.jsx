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
      gallows: PropTypes.func,
      guesses: PropTypes.func,
      keyboard: PropTypes.func,
      mystery: PropTypes.func,
    }),
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

    this.mapChildProps = (nextProps, nextState) => ({
      labels: nextProps.labels,
      handleAction: this.handleAction,
      handleInput: this.handleInput,
      render: this.renderPanel
    });

    this.mapGameProps = (nextProps, nextState) => {
      const { alphabet, maxRounds, mysteryWord } = nextProps;
      const { activeLetter, activeLetters } = nextState;

      const getActiveWord = () =>
        mysteryWord.toLowerCase();

      const getActiveRound = () =>
        activeLetters && nextProps.alphabet.filter(item =>
          activeLetters[item]).length;

      const getActiveKeyboard = () =>
        !activeLetter && activeLetters && getActiveRound()<maxRounds;

      const getActiveGuesses = () =>
        activeLetter && getActiveRound()<=maxRounds;

      const getActiveKeys = () =>
        alphabet.reduce((keys, name) => {
        keys.push({ name,
          disabled: !getActiveKeyboard()||activeLetters[name]
        });
        return keys;
      }, []);

      return {
        activeGuesses: getActiveGuesses(),
        activeKeys: getActiveKeys(),
        activeKeyboard: getActiveKeyboard(),
        activeRound: getActiveRound(),
        activeWord: getActiveWord(),
        mysteryWord, maxRounds,
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
      onGameBegin, onGuessSubmit, onLetterSelect
    } = setNextState;

    switch(action) {
      case actions.GAME_BEGIN:
        return this.setState((prevState, props) => {
          return onGameBegin(prevState, props, {
            activeLetters: this.makeLetters
          });
        });
      case actions.GUESS_SUBMIT:
        return this.setState((prevState, props) => {
          return onGuessSubmit(prevState, props, value);
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
        <Container id="hangman-main">
          <Panel id="mystery"  {...childProps} />
          <Panel id="gallows"  {...childProps} />
          <Panel id="guesses"  {...childProps} />
          <Panel id="keyboard" {...childProps} />
        </Container>
      </div>
    );
  }
}
