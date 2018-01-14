import React from 'react';
import PropTypes from 'prop-types';
import { Field } from '../../components';

export const Guesses = props => (
  <Field id={`${props.name}-field`}
    action={props.action}
    disabled={props.disabled}
    labels={props.labels}
    names={props.names}
    name={props.name}
    nodes={props.nodes}
    value={props.value}
    handleButton={props.handleAction}
    handleChange={props.handleAction}
  />
);

Guesses.propTypes = {
  action: PropTypes.string,
  disabled: PropTypes.bool,
  labels: PropTypes.shape({
    button: PropTypes.string,
    input: PropTypes.string, //placeholder
    label: PropTypes.string,
  }),
  nodes: PropTypes.shape({
    button: PropTypes.bool,
    input: PropTypes.bool,
    label: PropTypes.bool,
  }),
  names: PropTypes.shape({
    button: PropTypes.string,
    input: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    button: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.object,
  }),
  value: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  handleButton: PropTypes.func,
  handleChange: PropTypes.func
};

Guesses.defaultProps = {
  action: 'ACTION_OF_BUTTON',
  disabled: false,
  labels: {
    label: 'Make a guess',
    button: 'ok'
  },
  names: {
    button: 'guessed',
    input: 'guessing'
  },
  name: 'guesses',
  styles: {
    button: {},
    input: {},
    label: {}
  },
  value: '',
  handleButton: () => console.log('handleButton not setup'),
  handleChange: () => console.log('handleChange not setup'),
};
