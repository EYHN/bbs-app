import React from 'react';
import { pure } from 'recompose';

export type IProps = React.HTMLProps<HTMLElement>;

const Lists = (props: IProps) => {
  return (
    <article
      {
      ...props
      }
    />
  );
};

export default pure(Lists);
