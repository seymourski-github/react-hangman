import PropTypes from 'prop-types';
import { compose, setPropTypes, withProps } from 'recompose';

export default function withStyleProps(Component) {

  const ComponentWithFlexItemProps = compose(
    setPropTypes({
      alignSelf: PropTypes.string,
      flexItem: PropTypes.string
    }),
    withProps(props => {
      const { alignSelf, flexItem, style } = props;
      return {
        ...props,
        style: {
          ...style,
          alignSelf: alignSelf,
          flex: flexItem
        }
      };
    })
  )(Component);

  return ComponentWithFlexItemProps;
}
