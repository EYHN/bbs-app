import { withStyles, css } from 'withStyles';
import * as React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { NavLink, LinkProps } from 'react-router-dom';

interface Props {
  active?: boolean;
  label: React.ReactNode;
  icon: React.ReactNode;
}

@withStyles(({ color, font }) => ({
  Link: {
    ...font.dark.Body1,
    display: 'block',
    minWidth: '80px',
    maxWidth: '168px',
    height: '56px',
    textAlign: 'center',
    flexGrow: '1',
    flexBasis: '80px',
    position: 'relative',
    padding: '6px',
    textDecoration: 'none'
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
    display: 'block',
    marginTop: '2.75px',
    lineHeight: '20px',
    opacity: '0',
    transition: 'opacity 0.25s',
    textDecoration: 'none',
    color: color.BottomNavigationText
  },
  labelActive: {
    opacity: '1'
  }
}))
export default class BottomNavigationLink extends React.PureComponent<
    IWithStyleProps & Props & LinkProps> {
  public render() {
    const {
      theme,
      styles,
      active,
      label,
      icon,
      ...otherProps
    } = this.props;
    return (
      <NavLink
        {
        ...mergeProps(css(styles.Link, active && styles.active), otherProps)
        }
      >
        <span {...css(styles.icon, active && styles.iconActive)}>
          {icon}
        </span>
        <span {...css(styles.label, active && styles.labelActive)}>{label}</span>
      </NavLink>
    );
  }
}
