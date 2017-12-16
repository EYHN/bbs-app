import { withStyles, css } from 'withStyles';
import * as React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mixingProps from 'utils/mixingProps';

@withStyles(({ color }) => ({
  AppBar: {
    'background-color': color.AppBar,
    'box-shadow': '0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24)',
    'min-height': '56px'
  }
}))
export default class AppBar extends React.PureComponent<IWithStyleProps, undefined> {
  public render() {
    const {
      theme,
      styles,
      ...otherProps
    } = this.props;
    return (
        <article
          {
            ...mixingProps(otherProps, css(this.props.styles.AppBar))
          }
        />
      );
  }
}
