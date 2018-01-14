import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const getStyles = props => {
  const { flexItem, style } = props;
  if(!style && !flexItem) return;
  return {
    ...style,
    flex: flexItem
  };
};

const getClass = props => {
  const { flex } = props;
  return classNames('container', {
    column: flex && flex==='column',
    row: flex===true || flex==='row',
  });
};

export const Container = props => {
  const { id, children } = props;
  if(!children) return null;
  return (
    <div className={getClass(props)} id={id} style={getStyles(props)}>
      {children}
    </div>
  );
};

Container.propTypes = {
  flexItem: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  flexDirection: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string
};

Container.defaultProps = {
  className: 'container',
  id: null,
  flexItem: false,
  style: null
};
