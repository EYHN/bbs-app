import React from 'react';
import { pure } from 'recompose';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';

export type IProps = IWithStyleProps & React.HTMLProps<HTMLHeadingElement>;

const Heading = withStyles(({ font }) => ({
  heading: {
    padding: '8px 16px',
    margin: '0px',
    ...font.light.Body2Secondary
  }
}))((props: IProps) => {
  const {
    styles,
    theme,
    ...otherProps
  } = props;
  return (
    <h2
      {...mergeProps(css(styles.heading),
        otherProps) }
    />
  );
});

export default pure(Heading);
