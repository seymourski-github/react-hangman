import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Label } from '../../components';

export const Footer = props => {

  const {
    action, id, labels, name, result, handleAction
  } = props;

  const counter = labels.counter(props);

  return (
    <Container flex={true} id={id} >
      <Label text={counter} visible={!result} />
      <Button action={action} name={name} handleClick={handleAction} />
    </Container>
  );
};

Footer.propTypes = {
  action: PropTypes.string,
  labels: PropTypes.object,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleAction: PropTypes.func
};

Footer.defaultProps = {
  action: null,
  labels: {},
  handleAction: () => console.log('handleAction button fail')
};
