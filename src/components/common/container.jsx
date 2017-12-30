import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const getStyles = props => {
  const { flexDirection, flexItem, flexWrap, style } = props;
  if(!style && !flexItem) return;
  return {
    ...style,
    flex: flexItem,
    flexDirection: flexDirection,
    flexWrap: flexWrap
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
  flex: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  flexDirection: PropTypes.string,
  flexWrap: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string
};

Container.defaultProps = {
  className: 'container',
  id: null,
  flex: 'row',
  flexDirection: 'row',
  flexWrap: 'wrap',
  style: null
};
