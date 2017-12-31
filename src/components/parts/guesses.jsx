import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Input, Label } from '../../components';

export const Guesses = props => {

  const { action, disabled, id, labels, guessing, handleAction } = props;

  const mapProps = name => ({
    name, handleAction, disabled,
    handleChange: handleAction,
    text: labels[name],
    value: guessing
  });

  return (
    <Container flex="row" id={id}>
      <Label alignSelf="flex-end" flexItem="100%" htmlFor="guessing"
        text={labels.guessing}
        visible={!disabled}
      />
      <Input {...mapProps('guessing', props)} autoFocus flexItem="1 0 auto" />
      <Button {...mapProps('guessed', props)} action={action} flexItem="none" />
    </Container>
  );

};

Guesses.propTypes = {
  handleAction: PropTypes.func,
  action: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  guessing: PropTypes.string,
  guessed: PropTypes.string,
  id: PropTypes.string.isRequired,
  labels: PropTypes.object,
};

Guesses.defaultProps = {
  handleAction: () => console.log('handleAction not setup'),
  action: 'ACTION_OF_BUTTON',
  guessing: 'guess onChange sent via handleAction',
  guessed: 'guessed onClick sent via handleAction & action',
  labels: {
    input: 'Make a guess',
    button: 'ok'
  },
};
