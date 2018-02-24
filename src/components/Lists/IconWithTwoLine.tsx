import React from 'react';
import { pure } from 'recompose';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';

export type IProps = IWithStyleProps & React.HTMLProps<HTMLDivElement> & {
  icon: React.ReactNode;
  primaryText: React.ReactNode;
  secondaryText: React.ReactNode;
};

const IconWithTwoLine = withStyles(({ font }) => ({
  root: {
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '24px',
    height: '24px',
    color: 'rgba(0,0,0,.54)'
  },
  primaryText: {
    margin: 0,
    padding: '7px 0 0 0',
    ...font.light.SubTitle
  },
  secondaryText: {
    display: 'inline-block',
    margin: 0,
    padding: '0 0 7px 0',
    ...font.light.Body1Secondary
  },
  textContainer: {
    display: 'inline-block',
    margin: '0 0 0 32px'
  }
}))((props: IProps) => {
  const {
    styles,
    theme,
    icon,
    primaryText,
    secondaryText,
    ...otherProps
  } = props;
  return (
    <div
      {...mergeProps(css(styles.root),
        otherProps) }
    >
      <span {...css(styles.icon)}>{icon}</span>
      <div {...css(styles.textContainer)}>
        <p {...css(styles.primaryText)}>{primaryText}</p>
        <span {...css(styles.secondaryText)}>{secondaryText}</span>
      </div>
    </div>
  );
});

export default pure(IconWithTwoLine);
