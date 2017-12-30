import React from 'react';
import PropTypes from 'prop-types';

const onBlur = handleInput => e => handleInput(e);
const onChange = handleInput => e => handleInput(e);

const mapProps = ({ className, disabled, id, name, type, value }) => ({
  id: id || name,
  className, disabled, name, type, value
});

const mapStyle =({ flexItem, style }) => ({
  ...style,
  flex: flexItem
});

export const Input = props => {
  const { handleBlur, handleChange } = props;
  return (
    <input {...mapProps(props)}
      style={mapStyle(props)}
      onBlur={handleBlur && onBlur(handleBlur)}
      onChange={handleChange && onChange(handleChange)}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  flexItem: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
};

Input.defaultProps = {
  handleBlur: e => false,
  handleChange: e => false,
  className: 'input',
  disabled: false,
  id: '',
  type: 'text',
  style: null,
  value: ''
}