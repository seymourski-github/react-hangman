import React from 'react';
import * as actions from './constants.js';
import { Guesses, Keyboard, Mystery } from '../../components';

const defaultProps = {
  alphabet: [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'
  ],
  maxRounds: 10,
  mystery: 'My secret word',
  labels: {
    keyboard: 'Choose a letter',
    guessing: 'Make a guess',
    guessed: 'ok'
  },
  renderKeyboard: props => {
    const { alphabet, activeLetters, labels, maxRounds } = props;
    const activeRound = activeLetters && alphabet.filter(item => activeLetters[item]).length;

    // use alphabet to make keys each key is the name of a <Button>
    const keys = alphabet.reduce((keys, key) => {
      keys.push({
        name: key,
        disabled: !activeLetters || activeRound>=maxRounds || activeLetters[key]
      });
      return keys;
    }, []);

    return (
      <Keyboard {...props} action={actions.LETTER_SELECT}
        keys={keys} label={labels.keyboard} />
    );
  },
  renderMystery: props => {
    const { activeLetters, id, mystery } = props;
    return (
      <Mystery id={id} activeLetters={activeLetters} mystery={mystery} />
    );
  },
  renderGuesses: props => {
    return (
      <Guesses action={actions.GUESS_SUBMIT} {...props} />
    );
  }
};

export {
  actions,
  defaultProps
}
