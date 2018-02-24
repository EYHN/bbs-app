import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export interface IProps {
  leftIcon?: React.ReactNode;
  titleText?: React.ReactNode;
  rightIcon?: React.ReactNode | React.ReactNode[];
}

const AppBarLayout = withStyles(({ font }) => ({
  main: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px'
  },
  full: {
    flexGrow: 1
  },
  title: {
    position: 'absolute',
    left: '72px',
    ...font.dark.Title
  }
}))((props: IWithStyleProps & React.HTMLProps<HTMLDivElement> & IProps) => {
  const {
    theme,
    styles,
    leftIcon,
    titleText,
    rightIcon,
    ...otherProps
  } = props;
  return (
    <div {...mergeProps(css(styles.main), otherProps)}>
      {leftIcon}
      <span {...css(styles.title)}>
        {titleText}
      </span>
      <span {...css(styles.full)} />
      {rightIcon}
    </div>
  );
});

export default pure(AppBarLayout);
