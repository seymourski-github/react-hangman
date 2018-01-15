import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps, setPropTypes } from 'recompose';
import { withStyleProps, withFlexItemProps } from './enhancers';

const Base = props => {
  const {
    children, className, disabled, hidden, htmlFor, style, text
  } = props;
  return (
    <label className={className}
      children={text||children}
      disabled={disabled}
      hidden={hidden}
      htmlFor={htmlFor}
      style={style}
    />
  );
};

export const Label = compose(
  defaultProps({
    className: 'label',
    disabled: false,
    hidden: false,
  }),
  setPropTypes({
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    htmlFor: PropTypes.string,
    text: PropTypes.string
  }),
  withStyleProps,
  withFlexItemProps
)(Base);
