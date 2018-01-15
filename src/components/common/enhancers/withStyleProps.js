import PropTypes from 'prop-types';
import { compose, defaultProps, setPropTypes, withProps } from 'recompose';

const getVisibiity = ({ visible }) => {
  return visible===false||visible==='hidden' ? 'hidden' : null;
};

export default function withStyleProps(Component) {

  const ComponentWithStyleProps = compose(
    setPropTypes({
      style: PropTypes.object,
      visible: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.string
      ])
    }),
    withProps(({ style, ...rest }) => ({
      ...rest,
      style: {
        ...style,
        visibility: getVisibiity(rest)
      }
    })),
    defaultProps({
      visible: true
    })
  )(Component);

  return ComponentWithStyleProps;
}
