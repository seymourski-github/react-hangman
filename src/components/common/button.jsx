import React from 'react';
import PropTypes from 'prop-types';

const mapProps = ({ className, disabled, label, name, style, text, type }) => ({
  children: text||name,
  className, disabled, name, style, type
});

export const Button = props =>
  <button {...mapProps(props)} onClick={props.handleClick} />;

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  handleClick: PropTypes.func
};

Button.defaultProps = {
  className: 'button',
  disabled: false,
  style: null,
  text: '',
  type: 'button',
  handleClick: () => console.log('handleClick button default'),
};
