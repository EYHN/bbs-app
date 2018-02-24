import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export type IProps = IWithStyleProps & React.HTMLProps<HTMLParagraphElement>;

const Metadata = withStyles(({ font }) => ({
  metadata: {
    ...font.light.CaptionSecondary
  }
}))((props: IProps) => {
  const {
    theme,
    styles,
    ...otherProps
  } = props;
  return <p {...mergeProps(css(styles.metadata), otherProps)} />;
});

export default pure(Metadata);
