import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';
import { pure } from 'recompose';

export type IProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
} & IWithStyleProps & React.HTMLProps<HTMLLabelElement>;

const Label = withStyles(({ font }) => ({
  Label: {
    display: 'inline-block',
    height: '19px',
    lineHeight: '19px'
  },
  icon: {
    height: '19px',
    verticalAlign: 'bottom'
  },
  title: {
    ...font.light.Caption,
    marginLeft: '8px',
    verticalAlign: 'bottom'
  },
  subtitle: {
    ...font.light.CaptionSecondary,
    marginLeft: '5px',
    verticalAlign: 'bottom'
  }
}))((props: IProps) => {
  const {
    theme,
    styles,
    icon,
    title,
    subtitle,
    ...otherProps
  } = props;
  return (
    <label {...mergeProps(css(styles.Label), otherProps)}>
      <span {...css(styles.icon)}>
        {icon}
      </span>
      <span {...css(styles.title)}>
        {title}
      </span>
      <span {...css(styles.subtitle)}>
        {subtitle}
      </span>
    </label>
  );
});

export default pure(Label);
