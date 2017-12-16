import { withStyles, css } from 'withStyles';
import * as React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mixingProps from 'utils/mixingProps';

@withStyles(({ color }) => ({
  BottomNavigation: {
    'display': 'flex',
    'position': 'fixed',
    'bottom': '0px',
    'width': '100%',
    'background-color': color.BottomNavigation,
    'color': color.BottomNavigationText,
    'box-shadow': '0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24)',
    'min-height': '56px',
    'justify-content': 'center',
    'align-items': 'center'
  }
}))
export default class BottomNavigation extends React.PureComponent<IWithStyleProps, undefined> {
  public render() {
    const {
      theme,
      styles,
      ...otherProps
    } = this.props;
    return (
        <article
          {
            ...mixingProps(otherProps, css(this.props.styles.BottomNavigation))
          }
        />
      );
  }
}
