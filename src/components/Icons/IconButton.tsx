import React from 'react';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export interface IProps {
  icon: React.ReactNode;
}

const iconButtonStyle = {
  padding: '0px',
  border: '0px',
  outline: 'none',
  WebkitTapHighlightColor: 'transparent'
};

const IconButton = ({icon, ...otherProps}: IProps & React.HTMLProps<HTMLButtonElement>) => (
  <button {...mergeProps({style: iconButtonStyle}, otherProps)}>
    {icon}
  </button>
);

export default pure(IconButton);
