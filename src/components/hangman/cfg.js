import React from 'react';
import * as actions from './constants.js';
import { Guesses, Keyboard, Mystery } from '../../components';

const defaultProps = {
  alphabet: [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'
  ],
  maxRounds: 10,
  mysteryWord: 'My secret word',
  labels: {
    keyboard: 'Choose a letter',
    guessing: 'Make a guess',
    guessed: 'ok'
  },
  renderPanels: {
    guesses: props => {
      return (
        <Guesses action={actions.GUESS_SUBMIT} {...props} />
      );
    },
    keyboard: props => {
      const { activeKeys, labels } = props;
      return (
        <Keyboard action={actions.LETTER_SELECT} {...props}
          keys={activeKeys} label={labels.keyboard} />
      );
    },
    mystery: props => {
      return (<Mystery {...props} />);
    }
  }
};

export {
  actions,
  defaultProps
}
