import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export type IProps = IWithStyleProps & React.HTMLProps<HTMLHeadingElement>;

const Title = withStyles(({ font }) => ({
  title: {
    ...font.light.Title
  }
}))((props: IProps) => {
  const {
    theme,
    styles,
    ...otherProps
  } = props;
  return <h1 {...mergeProps(css(styles.title), otherProps)} />;
});

export default pure(Title);
