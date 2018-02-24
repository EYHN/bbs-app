import React from 'react';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export type IProps = React.HTMLProps<HTMLDivElement>;

const FadeInAnimation = {
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
};

const FadeIn = withStyles(() => ({
  FadeIn: {
    animationName: FadeInAnimation,
    animationDuration: '250ms'
  }
}))((props: IProps & IWithStyleProps) => {
  const {
    styles,
    theme,
    children,
    ...otherProps
  } = props;
  return (
    <div {...mergeProps(css(styles.FadeIn), otherProps)}>
      {children}
    </div>
  );
});

export default pure(FadeIn);
