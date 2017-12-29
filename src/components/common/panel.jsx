import React from 'react';
import PropTypes from 'prop-types';

const renderProps = (id, props) => {
  return props.render(id, {
    ...props,
    id: `${id}-content`
  });
};

export const Panel = props => {
  const { className, id, children, render } = props;

  if(!render && !children) return;

  return (
    <div className={className} id={id}>
      <div className={`${className}-content`}>
        {children || renderProps(id, props)}
      </div>
    </div>
  );
};

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  id: PropTypes.string.isRequired,
  render: PropTypes.func,
};

Panel.defaultProps = {
  className: 'panel',
  render: () => null
};
