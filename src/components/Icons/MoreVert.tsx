import React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';
import { pure } from 'recompose';

const MoreVert = (props: ISvgIconProps) => (
  <SvgIcon viewBox='6 0 12 24' {...props}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/>
  </SvgIcon>
);

export default pure(MoreVert);
