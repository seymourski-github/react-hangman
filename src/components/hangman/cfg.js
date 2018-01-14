import React from 'react';
import * as actions from './constants.js';
import { Footer, Gallows, Guesses, Keyboard, Mystery } from '../../components';

const defaultProps = {
  alphabet: [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'
  ],
  display: {
    gallowsOn: true,
    roundToggleOn: true
  },
  maxRounds: 10,
  mysteryWord: 'My secret word',
  labels: {
    counter: props => {
      const count = props.maxRounds-props.activeRound;
      if(count > 0 && count < 10) {
        return `You can choose ${count} more letters`;
      }
      return '';
    },
    keyboard: 'Choose a letter',
    guesses: {
      button: 'ok',
      input: '',
      label: 'Make a guess'
    },
    loser: 'YOU LOSE !!',
    restart: 'Restart'
  },
  renderPanels: {
    footer: props => (
      <Footer {...props}
        action={actions.GAME_RESTART}
        name="restart"
      />
    ),
    gallows: props => (
      <Gallows {...props}
        activeIndex={props.activeRound||0}
        height={260} width={240}
      />
    ),
    guesses: props => {
      return (
        <Guesses {...props} name={'guesses'}
          action={actions.GUESS_SUBMIT}
          disabled={!props.activeGuesses}
          labels={props.labels.guesses}
          value={props.guessing}
        />
      );
    },
    keyboard: props => (
      <Keyboard {...props}
        action={actions.LETTER_SELECT}
        disabled={!props.activeKeyboard}
        keys={props.activeKeys}
        label={props.labels.keyboard}
      />
    ),
    mystery: props => {
      return (<Mystery {...props} />);
    }
  }
};

export {
  actions,
  defaultProps
}
