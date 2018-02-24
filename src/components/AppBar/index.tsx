import { withStyles, css } from 'withStyles';
import * as React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import Card from 'components/Card';
import AppBarLayout, {IProps as AppBarLayoutProps} from './AppBarLayout';

@withStyles(({ color }) => ({
  AppBar: {
    backgroundColor: color.AppBar,
    minHeight: '56px',
    color: color.AppBarText,
    position: 'relative'
  }
}))
export default class AppBar extends React.PureComponent<IWithStyleProps & AppBarLayoutProps> {
  public render() {
    const {
      theme,
      styles,
      children,
      leftIcon,
      titleText,
      rightIcon,
      ...otherProps
    } = this.props;
    const layout = (leftIcon || titleText || rightIcon) &&
      <AppBarLayout {...{leftIcon, titleText, rightIcon}} />;
    return (
      <Card
        {
        ...mergeProps(css(this.props.styles.AppBar), otherProps)
        }
        up
      >
        {layout}
        {children}
      </Card>
    );
  }
}
