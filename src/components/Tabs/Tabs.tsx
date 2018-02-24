import React from 'react';
import { css, withStyles } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';

export type TabsChangeEventHandler = (value: number) => void;

export interface IProps {
  onTabsChange?: TabsChangeEventHandler;
  value?: any;
  indicatorTransition?: boolean;
  indicatorOffset?: number;
}

@withStyles(({ }) => ({
  root: {
    overflow: 'hidden',
    minHeight: 42,
    backgroundColor: '#fff',
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
  },
  flexContainer: {
    position: 'relative',
    overflowX: 'hidden',
    display: 'flex',
    width: '100%'
  },
  indicatorContainer: {
    position: 'absolute',
    width: '100%',
    willChange: 'transform',
    bottom: 0,
    left: 0
  },
  indicator: {
    display: 'block',
    height: 2,
    backgroundColor: '#424242',
    willChange: 'width'
  },
  indicatorContainerTransition: {
    transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
  }
}))
class Tabs extends React.PureComponent<IProps & React.HTMLProps<HTMLDivElement> & IWithStyleProps> {

  render() {
    const {
      children: childrenProp,
      onTabsChange,
      value,
      styles,
      theme,
      indicatorTransition = true,
      indicatorOffset = 0,
      ...otherProps
    } = this.props;

    const selected = parseInt(value, 10) || 0;

    const tabsCount = React.Children.count(childrenProp);

    const indicator = (
      <span
        {...css(styles.indicator, {
          width: 1 / tabsCount * 100 + '%'
        })}
      />
    );

    const children = React.Children.map(childrenProp, (child, index) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      const isSelected = index === value;
      return React.cloneElement(child as any, {
        selected: isSelected,
        onTabsChange,
        index,
        style: {
          flexBasis: 1 / tabsCount * 100 + '%'
        }
      });
    });

    return (
      <div {...mergeProps(css(styles.root), otherProps)}>
        <div {...css(styles.flexContainer)} role='tablist'>
          {children}
          <span
            {...css(styles.indicatorContainer,
              indicatorTransition && styles.indicatorContainerTransition,
              {
                transform: `translateX(${1 / tabsCount * selected * 100 + (indicatorOffset || 0) / tabsCount * 100}%)`
              }
            ) }
          >
            {indicator}
          </span>
        </div>
      </div>
    );
  }
}

export default Tabs;
