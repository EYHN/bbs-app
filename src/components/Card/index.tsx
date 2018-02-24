import React from 'react';
import { pure } from 'recompose';
import { css } from 'withStyles';
import mergeProps from 'utils/mergeProps';

export type IProps = React.HTMLProps<HTMLDivElement> & {
  up?: boolean;
};

const Card = (props: IProps) => {
  const {
    up = false,
    ...otherProps
  } = props;
  return (
    <div
      {
      ...mergeProps(
        css(!up ? {
          boxShadow: '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)'
        } : {
            boxShadow: '0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24)'
          }),
        otherProps
      )
      }
    />
  );
};

export default pure(Card);
