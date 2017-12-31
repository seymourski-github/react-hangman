
const onGameBegin = (prevState, props, newVal) => ({
  activeLetters: newVal,
  activeLetter: null,
  guessing: '',
  guessed: ''
});

const onGuessSubmit = (prevState, props, newVal) => ({
  activeLetter: null,
  guessing: '',
  guessed: newVal
});

const onLetterSelect = (prevState, props, newVal) => ({
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
  onGuessSubmit,
  onLetterSelect
}
