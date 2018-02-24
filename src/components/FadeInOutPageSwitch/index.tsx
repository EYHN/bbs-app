import React from 'react';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import { pure } from 'recompose';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Location } from 'history';
import { Switch } from 'react-router';
import mergeProps from 'utils/mergeProps';

export type IProps = React.HTMLProps<HTMLDivElement> & {
  location: Location;
  propsEachPage?: React.HTMLProps<HTMLDivElement>;
  transitionKey?: any;
};

const routerTransitionDuration = 200;

const FadeInOutPageSwitch = withStyles(() => ({
  pageTransition: {
    transition: `opacity ${routerTransitionDuration}ms`,
    opacity: 0,
    willChange: 'opacity'
  },
  pageEntering: {
    opacity: 0,
    transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
  },
  pageEntered: {
    opacity: 1,
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  }
}))((props: IProps & IWithStyleProps) => {
  const {
    styles,
    theme,
    children,
    location,
    propsEachPage,
    transitionKey,
    ...otherProps
  } = props;
  const body = (state: string) => (
    <div
      {...mergeProps(css(styles.pageTransition,
        state === 'entering' && styles.pageEntering,
        state === 'entered' && styles.pageEntered), propsEachPage) }
    >
      <Switch location={location}>
        {children}
      </Switch>
    </div>
  );
  return (
    <TransitionGroup {...otherProps as any}>
      <Transition key={transitionKey || location.key} timeout={routerTransitionDuration}>
        {body}
      </Transition>
    </TransitionGroup>
  );
});

export default pure(FadeInOutPageSwitch);
