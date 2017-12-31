import * as constants from './constants.js';

const onGameBegin = (prevState, props, newVal) => ({
  activeLetter: null,
  activeRound: 0,
  guessing: '',
  guessed: '',
  result: null,
  ...newVal
});

const onGameResult = (prevState, props, newVal) => {
  const lost = newVal===constants.GAME_LOST;
  const activeWord = lost
    ? props.labels.loser
    : prevState.activeWord;

  return {
    activeLetters: null,
    activeLetter: null,
    activeRound: lost? 11: 12,
    activeWord: activeWord,
    guessing: '',
    guessed: '',
    result: newVal
}};

const onGuessSubmit = (prevState, props, newVal) => ({
  activeLetter: null,
  guessing: '',
  guessed: newVal
});

const onLetterSelect = (prevState, props, newVal) => ({
  activeRound: prevState.activeRound + 1,
  activeLetter: Object.keys(newVal).pop(),
  activeLetters: {
    ...prevState.activeLetters,
    ...newVal
  },
  guessing: '',
  guessed: ''
});

export {
  onGameBegin,
  onGameResult,
  onGuessSubmit,
  onLetterSelect
}
