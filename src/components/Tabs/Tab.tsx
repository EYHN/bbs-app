import React, { ReactEventHandler } from 'react';
import mergeProps from 'utils/mergeProps';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import { TabsChangeEventHandler } from 'components/Tabs/Tabs';
import { pure } from 'recompose';

export interface IProps {
  onTabsChange?: TabsChangeEventHandler;
  index?: number;
  selected?: boolean;
}

const Tab = withStyles(({ font }) => ({
  button: {
    padding: '6px 12px',
    minHeight: '42px',
    border: '0px',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    overflow: 'hidden',
    opacity: 0.6,
    transition: 'opacity 200ms',
    willChange: 'opacity',
    ...font.light.Body2
  },
  selected: {
    opacity: 1
  }
}))((props: IProps & React.HTMLProps<HTMLButtonElement> & IWithStyleProps) => {
  const {
    styles,
    theme,
    onTabsChange,
    index,
    selected,
    ...otherProps
  } = props;
  const handleOnClick: ReactEventHandler<MouseEvent> = () => {
    onTabsChange(index);
  };
  return (
    <button
      onClick={handleOnClick}
      {...mergeProps(css(styles.button, selected && styles.selected), otherProps)}
    />
  );
});

export default pure(Tab);
