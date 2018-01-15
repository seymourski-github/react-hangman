import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps, setPropTypes, withHandlers } from 'recompose';
import { withStyleProps, withFlexItemProps } from './enhancers';
import './input.css';

const BaseInput = props => {
  const {
    autoFocus, className, disabled, hidden,
    id, name, style, type, value,
    onBlur, onChange
  } = props;
  return(
    <input className={className} id={id} name={name}
      autoFocus={autoFocus}
      disabled={disabled}
      hidden={hidden}
      onBlur={onBlur}
      onChange={onChange}
      style={style}
      type={type}
      value={value}
    />
  );
};

export const Input = compose(
  defaultProps({
    className: 'input',
    disabled: false,
    type: 'text',
    handleBlur: (e) => false,
    handleChange: (e) => false
  }),
  setPropTypes({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func
  }),
  withHandlers({
    onBlur: props => e => props.handleBlur(e),
    onChange: props => e => props.handleChange(e)
  }),
  withFlexItemProps,
  withStyleProps
)(BaseInput);
