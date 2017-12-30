import React from 'react';
import * as actions from './constants.js';
import { Keyboard } from '../../components';

const defaultProps = {
  alphabet: [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'
  ],
  maxRounds: 10,
  mystery: 'My secret word',
  labels: {
    keybord: 'Choose a letter'
  },
  renderKeyboard: props => {

    // use alphabet to make keys
    const {
      alphabet, activeLetters, handleAction, id, labels, maxRounds,
    } = props;

    const activeRound = activeLetters && alphabet.filter(item => activeLetters[item]).length;

    // each key is the name of a <Button>
    const keys = alphabet.reduce((keys, key) => {
      keys.push({
        name: key,
        disabled: !activeLetters || activeRound>=maxRounds || activeLetters[key]
      });
      return keys;
    }, []);

    return (
      <Keyboard action={actions.LETTER_SELECT} id={id}
        handleAction={handleAction} keys={keys} label={labels.keyboard}
      />
    );
  }
};

export {
  actions,
  defaultProps
}
