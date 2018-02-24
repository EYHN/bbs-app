import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export interface IProps {
  leftIcon?: React.ReactNode;
  avatarImg?: React.ReactNode;
  titleText?: React.ReactNode;
  subTitleText?: React.ReactNode;
  rightIcon?: React.ReactNode | React.ReactNode[];
}

const AvatarAppBarLayout = withStyles(({ font }) => ({
  main: {
    display: 'flex',
    position: 'relative',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px'
  },
  full: {
    flexGrow: 1
  },
  line2: {
    display: 'flex',
    margin: '24px 0 8px 0',
    flexBasis: '100%'
  },
  head: {
    margin: '0 0 0 24px'
  },
  titleText: {
    margin: '0px',
    ...font.dark.Title
  },
  subTitleText: {
    margin: '4px 0 0 0',
    display: 'inline-block',
    ...font.dark.Body1
  },
  avatar: {
    borderRadius: '50%',
    overflow: 'hidden'
  }
}))((props: IWithStyleProps & React.HTMLProps<HTMLDivElement> & IProps) => {
  const {
    theme,
    styles,
    leftIcon,
    titleText,
    subTitleText,
    avatarImg,
    rightIcon,
    ...otherProps
  } = props;
  return (
    <div {...mergeProps(css(styles.main), otherProps)}>
      {leftIcon}
      <span {...css(styles.full)} />
      {rightIcon}
      <div {...css(styles.line2)}>
        <div {...css(styles.avatar)}>
          {avatarImg}
        </div>
        <div {...css(styles.head)}>
          <h1 {...css(styles.titleText)}>{titleText}</h1>
          <span {...css(styles.subTitleText)}>{subTitleText}</span>
        </div>
      </div>
    </div>
  );
});

export default pure(AvatarAppBarLayout);
