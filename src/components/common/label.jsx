import React from 'react';
import PropTypes from 'prop-types';

const mapProps = ({
  children, className, disabled, hidden, htmlFor, text
}) => ({
  children: text||children,
  className, disabled, hidden, htmlFor
});

const mapStyle = ({ alignSelf, style, flexItem, visible }) => ({
  ...style,
  alignSelf,
  flex: flexItem,
  visibility: visible ? 'visible':'hidden'
});

export const Label = props => {
  return (
    <label {...mapProps(props)}
      style={mapStyle(props)}
    />
  );
};

Label.propTypes = {
  alignSelf: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  flexItem: PropTypes.string,
  hidden: PropTypes.bool,
  style:  PropTypes.object,
  visible: PropTypes.bool,
  text: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

Label.defaultProps = {
  alignSelf: '',
  className: 'label',
  disabled: false,
  hidden: false,
  flex: '',
  style:  null,
  text: '',
  visible: true
}
