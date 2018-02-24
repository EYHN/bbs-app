import React from 'react';
import { withStyles, css } from 'withStyles';
import mergeProps from 'utils/mergeProps';
const hoistNonReactStatics = require('hoist-non-react-statics');

const FadeInAnimation = {
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
};

export default (WrappedComponent: React.ComponentClass | React.StatelessComponent) => {
  @withStyles(() => ({
    FadeIn: {
      animationName: FadeInAnimation,
      animationDuration: '250ms'
    }
  }))
  class AnimationInjector extends React.Component<any> {
    static WrappedComponent = WrappedComponent;
    static displayName = `withFadeIn(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    render() {
      const {
        styles,
        theme,
        ...otherProps
      } = this.props;
      return <WrappedComponent {...mergeProps(css(styles.FadeIn), otherProps)} />;
    }
  }

  return hoistNonReactStatics(AnimationInjector, WrappedComponent) as typeof WrappedComponent;
};
