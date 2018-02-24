import React from 'react';
import { pure } from 'recompose';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';

export type IProps = IWithStyleProps & React.HTMLProps<HTMLHeadingElement>;

const Hr = withStyles(({ }) => ({
  Hr: {
    margin: '0 0 0 72px',
    border: '0px',
    height: '1px',
    backgroundColor: 'rgba(0,0,0,.09)'
  }
}))((props: IProps) => {
  const {
    styles,
    theme,
    ...otherProps
  } = props;
  return (
    <hr
      {...mergeProps(css(styles.Hr),
        otherProps) }
    />
  );
});

export default pure(Hr);
