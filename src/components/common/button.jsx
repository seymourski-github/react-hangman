import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps, setPropTypes, withHandlers } from 'recompose';
import { withStyleProps, withFlexItemProps } from './enhancers';
import './button.css';

const BaseButton = props => {
  const {
    className, disabled, hidden, id, name,
    onClick, style, text, type, value
  } = props;
  return (
    <button className={className} name={name}
      id={id||`${name}-button`}
      children={text||name}
      disabled={disabled}
      hidden={hidden}
      onClick={onClick}
      style={style}
      type={type}
      value={value}
    />
  );
};

export const Button = compose(
  defaultProps({
    className: 'button',
    disabled: false,
    type: 'button',
    handleClick: (e) => false
  }),
  setPropTypes({
    action: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
  }),
  withHandlers({
    onClick: props => e => {
      const { action, name, value, handleClick } = props;
      return action ? handleClick({action, name, value}) : handleClick(e);
    }
  }),
  withStyleProps,
  withFlexItemProps
)(BaseButton);
