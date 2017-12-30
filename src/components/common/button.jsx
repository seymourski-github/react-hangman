import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const onClick = props => {
  const { action, name, value, handleAction, handleClick } = props;
  return action && handleAction
    ? handleAction.bind(null, {action, name, value})
    : handleClick;
};

const mapProps = ({
  action, className, disabled, label, name, style, text, type, value
}) => ({
  children: text||name,
  className, disabled, name, style, type, value
});

export const Button = props =>
  <button {...mapProps(props)} onClick={onClick(props)} />;

Button.propTypes = {
  action: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  handleAction: PropTypes.func,
  handleClick: PropTypes.func
};

Button.defaultProps = {
  action: '',
  className: 'button',
  disabled: false,
  style: null,
  text: '',
  type: 'button',
  value: '',
  handleAction: () => console.log('handleAction button fail'),
  handleClick: () => console.log('handleClick button fail'),
};
