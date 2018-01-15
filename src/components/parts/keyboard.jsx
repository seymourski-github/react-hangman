import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Label } from '../../components';

export const Keyboard = props => {
  const { action, disabled, keys, id, handleAction, label } = props;

  const buttons = keys.map(key =>
    <Button {...key} flexItem={'0 0 2em'}
      key={key.name}
      disabled={key.disabled||disabled}
      action={action}
      handleClick={handleAction}
    />);

  return (
    <Container flex={true} id={id}>
      <Label text={label} visible={!disabled} flexItem="100%" />
      {buttons}
    </Container>
  );
};

Keyboard.propTypes = {
  action: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  label: PropTypes.string,
  handleAction: PropTypes.func
};

Keyboard.defaultProps = {
  action: 'ACTION_SENT_WITH_HANDLE_ACTION',
  disabled: false,
  label: 'Choose a letter',
  handleAction: () => console.log('handleAction button fail')
};
