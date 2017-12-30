import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Input, Label } from '../../components';

export const Guesses = props => {

  const {
    action, id, labels, guessing, handleAction, handleInput
  } = props;

  const mapProps = name => ({
    name, handleAction,
    handleChange: handleInput,
    text: labels[name],
    style:  { flex: 'none' },
    value: guessing
  });

  return (
    <Container flex="row" id={id}>
      <Label alignSelf="flex-end" flexItem="100%" htmlFor="guessing" text={labels.guessing} />
      <Input {...mapProps('guessing', props)} autoFocus flexItem="1 0 auto" />
      <Button {...mapProps('guessed', props)} action={action} flexItem="none" />
    </Container>
  );

};

Guesses.propTypes = {
  action: PropTypes.string.isRequired,
  guessing: PropTypes.string,
  guessed: PropTypes.string,
  id: PropTypes.string.isRequired,
  labels: PropTypes.object,
  handleAction: PropTypes.func,
  handleInput: PropTypes.func
};

Guesses.defaultProps = {
  action: 'ACTION_OF_BUTTON',
  guessing: 'guess being typed and sent via handleInput',
  guessed: 'last guess sent using handleAction',
  labels: {
    input: 'Make a guess',
    button: 'ok'
  },
  handleAction: () => console.log('handleAction button fail'),
  handleInput: () => console.log('handleInput button fail'),
};
