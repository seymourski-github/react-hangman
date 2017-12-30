import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Panel } from '../../components';
import { actions, defaultProps } from './cfg.js';

export default class Hangman extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    alphabet: PropTypes.array,
    labels: PropTypes.object,
    maxRounds: PropTypes.number,
    mysteryWord: PropTypes.string,
    renderPanel: PropTypes.shape({
      guesses: PropTypes.func,
      keyboard: PropTypes.func,
      mystery: PropTypes.func,
    })
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
      const { activeLetters } = nextState;

      const getActiveWord = () =>
        mysteryWord.toLowerCase();

      const getActiveRound = () =>
        activeLetters && nextProps.alphabet.filter(item =>
          activeLetters[item]).length;

      const getActiveKeyboard = () =>
        activeLetters && getActiveRound() < maxRounds;

      const getActiveKeys = () =>
        alphabet.reduce((keys, name) => {
        keys.push({ name,
          disabled: !getActiveKeyboard()||activeLetters[name]
        });
        return keys;
      }, []);

      return {
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
  * renderPanel - called from <Panel> props render
  */
  renderPanel = (id, childProps) => {
    const { gameProps } = this;
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
          <Panel id="guesses"  {...childProps} />
          <Panel id="keyboard" {...childProps} />
          <Panel id="mystery"  {...childProps} />
        </Container>
      </div>
    );
  }
}
