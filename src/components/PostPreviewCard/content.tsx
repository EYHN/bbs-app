import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export type IProps = IWithStyleProps & React.HTMLProps<HTMLParagraphElement>;

const Content = withStyles(({ font }) => ({
  content: {
    ...font.light.Body1,
    opacity: 0.8
  }
}))((props: IProps) => {
  const {
    theme,
    styles,
    ...otherProps
  } = props;
  return <p {...mergeProps(css(styles.content), otherProps)} />;
});

export default pure(Content);
