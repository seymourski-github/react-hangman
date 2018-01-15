import PropTypes from 'prop-types';
import { compose, setPropTypes, withProps } from 'recompose';

export default function withStyleProps(Component) {

  const ComponentWithFlexFlowProps = compose(
    setPropTypes({
      flexFlow: PropTypes.string
    }),
    withProps(props => {
      const { style, flexFlow } = props;
      return {
        ...props,
        style: {
          ...style,
          flexFlow: flexFlow
        }
      };
    })
  )(Component);

  return ComponentWithFlexFlowProps;
}
