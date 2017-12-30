import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from '../common';
import './mystery.css';

const makeConfig = (letters, activeLetters) => (
  letters.reduce((acc, letter) => {
  acc.push({
    revealed: !activeLetters || activeLetters[letter.toLowerCase()],
    space: letter===' ',
    text: letter
  });
  return acc;
}, []));

export const Mystery = props => {
  const { id, mystery, activeLetters, getClassName } = props;

  // make letter array from mystery word with any revealed/spaces
  const letters = makeConfig(mystery.split(''), activeLetters);

  // only show label text if already revealed
  const labels = letters.map((item, i) => (
    <Label {...item}
      key={`${item.text}${i}`}
      className={getClassName(item.text, props)}
      children={item.revealed&&!item.space ? item.text: ''}
      text={item.revealed&&!item.space ? item.text: ''}
    />));

  return <Container flex={true} id={id} children={labels} />;

};

Mystery.propTypes = {
  activeLetters: PropTypes.object,
  id: PropTypes.string.isRequired,
  mystery: PropTypes.string,
  getClassName: PropTypes.func
};

Mystery.defaultProps = {
  activeLetters:  {},
  mystery: '',
  getClassName: (str, props) => {
    const space = str===' ';
    return `label ${space?'mystery-spacer':'mystery-letter'}`;
  }

};
