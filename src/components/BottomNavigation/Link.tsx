import { withStyles, css } from 'withStyles';
import * as React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mixingProps from 'utils/mixingProps';
import FiberNew from '../icons/FiberNew';
import { Link, LinkProps } from 'react-router-dom';

interface Props {
  active?: boolean;
  label: React.ReactNode;
  icon: (props: any) => JSX.Element;
}

@withStyles(({ color }) => ({
  Link: {
    'display': 'block',
    'min-width': '80px',
    'max-width': '168px',
    'height': '56px',
    'text-align': 'center',
    'flex-grow': '1',
    'position': 'relative',
    'padding': '6px',
    'text-decoration': 'none',
    'font-size': '14px'
  },
  icon: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    color: color.BottomNavigationIcon,
    opacity: '0.7',
    transition: 'opacity 0.25s, transform .25s',
    transform: 'translateY(10px)'
  },
  iconActive: {
    opacity: '1',
    transform: 'translateY(0px)'
  },
  label: {
    'display': 'block',
    'margin-top': '2.75px',
    'line-height': '20px',
    'opacity': '0',
    'transition': 'opacity 0.25s',
    'text-decoration': 'none',
    'color': color.BottomNavigationText
  },
  labelActive: {
    opacity: '1'
  }
}))
export default class BottomNavigationLink extends React.PureComponent<
    IWithStyleProps & Props & LinkProps,
    undefined> {
  public render() {
    const {
      theme,
      styles,
      active,
      label,
      icon: Icon,
      ...otherProps
    } = this.props;
    return (
      <Link
        {
        ...mixingProps(otherProps, css(styles.Link, active && styles.active))
        }
      >
        <Icon {...css(styles.icon, active && styles.iconActive)} />
        <span {...css(styles.label, active && styles.labelActive)}>{label}</span>
      </Link>
    );
  }
}
