import { withStyles, css } from 'withStyles';
import * as React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import Card from 'components/Card';

@withStyles(({ color }) => ({
  BottomNavigation: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    backgroundColor: color.BottomNavigation,
    color: color.BottomNavigationText,
    minHeight: '56px',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
export default class BottomNavigation
    extends React.PureComponent<IWithStyleProps & React.HTMLProps<HTMLElement> & { bottomFixed?: boolean }, undefined> {
  public render() {
    const {
      theme,
      styles,
      bottomFixed,
      ...otherProps
    } = this.props;
    return (
        <Card
          {
            ...mergeProps(css(styles.BottomNavigation), otherProps)
          }
        />
      );
  }
}
