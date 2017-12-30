import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Label } from '../common';

export const Keyboard = props => {
  const { action, keys, id, handleAction, label } = props;

  const buttons = keys.map(key =>
    <Button {...key}
      key={key.name}
      action={action}
      handleAction={handleAction}
    />);

  return (
    <Container id={id}>
      <Label text={label} flexItem="100%" />
      {buttons}
    </Container>
  );
};

Keyboard.propTypes = {
  action: PropTypes.string,
  id: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  label: PropTypes.string,
  handleAction: PropTypes.func
};

Keyboard.defaultProps = {
  action: 'ACTION_SENT_WITH_HANDLE_ACTION',
  label: 'Choose a letter',
  handleAction: () => console.log('handleAction button fail')
};
