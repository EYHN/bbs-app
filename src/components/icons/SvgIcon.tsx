import React from 'react';

const defaultProps = {
  viewBox: '0 0 24 24',
  color: 'inherit',
};

const SvgIcon = (props: React.HTMLProps<SVGSVGElement>) =>
  <svg
    {
      ...{
        ...defaultProps,
        ...props
      }
    }
  />;

export default SvgIcon;
