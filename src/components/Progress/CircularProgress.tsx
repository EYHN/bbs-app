import { withStyles, css } from 'withStyles';
import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import mergeProps from 'utils/mergeProps';

const SIZE = 50;
const THICKNESS = 6;

function easeInOutQuad(t: number, b: number, c: number) {
  t /= 1 / 2;
  if (t < 1) { return c / 2 * t * t + b; }
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}

function getArcLength(fraction: number) {
  return fraction * Math.PI * (SIZE - THICKNESS);
}

interface IProps {
  size?: number | string;
  value?: number;
  color?: string;
}

@withStyles(({ }) => ({
  CircularProgress: {
    display: 'inline-block'
  },
  circle: {
    stroke: 'currentColor',
    strokeLinecap: 'round'
  }
}))
export default class CircularProgress
  extends React.PureComponent<IWithStyleProps & React.HTMLProps<HTMLElement> & IProps> {

  state = {
    svgRotate: 0,
    mode: 'determinate',
    circleStrokeDashBegin: getArcLength(0),
    circleStrokeDashoffset: 0
  };

  updateAnimationFrameRequest: number = undefined;

  lastUpdateTime: number = Date.now();

  componentDidMount() {
    this.updateAnimate();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateAnimationFrameRequest);
  }

  public render() {
    const {
      theme,
      styles,
      size = 40,
      value,
      ...otherProps
    } = this.props;
    return (
      <svg
        {...mergeProps(
          css({
            transform: `rotate(${this.state.svgRotate}deg)`
          },
            styles.CircularProgress, { width: size, height: size }),
          {
            viewBox: `0 0 ${SIZE} ${SIZE}`,
            ...otherProps
          }) }
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={(SIZE - THICKNESS) / 2}
          fill='none'
          strokeWidth={THICKNESS}
          {...css(
            {
              strokeDasharray: `${this.state.circleStrokeDashBegin},${getArcLength(1)}`,
              strokeDashoffset: this.state.circleStrokeDashoffset
            },
            styles.circle
          ) }
        />
      </svg>
    );
  }

  protected isNotNeedUpdateState() {
    return this.state.circleStrokeDashoffset > -0.01 &&
    this.state.circleStrokeDashoffset < 0.01 &&
    Math.abs(this.state.circleStrokeDashBegin - getArcLength(1)) < 0.01 &&
    this.props.value === 1;
  }

  private updateAnimate = () => {
    const delayTime = Date.now() - this.lastUpdateTime;
    const newState = {
      ...this.state
    };
    if (!this.isNotNeedUpdateState()) {
      newState.svgRotate = Date.now() / (1500 / 360) % 360;
      if (this.state.mode === 'indeterminate') {
        const animationCurrentTime = Date.now() % 1500 / 1500;
        if (animationCurrentTime <= 0.14) {
          newState.circleStrokeDashBegin = getArcLength(0.0);
          newState.circleStrokeDashoffset = 0.0;
        } else if (animationCurrentTime <= .57) {
          const dash = easeInOutQuad((animationCurrentTime - .14) / (.57 - .14), 0.0, getArcLength(.7));
          const offset = easeInOutQuad((animationCurrentTime - .14) / (.57 - .14), 0.0, getArcLength(-.3));
          newState.circleStrokeDashBegin = dash;
          newState.circleStrokeDashoffset = offset;
        } else {
          const offset = easeInOutQuad((animationCurrentTime - .57) / (1 - .57), getArcLength(-.3), getArcLength(-.69));
          newState.circleStrokeDashBegin = getArcLength(.7);
          newState.circleStrokeDashoffset = offset;
        }
        newState.mode = typeof this.props.value === 'undefined' ? 'indeterminate' : 'determinate';
      } else {
        const targetDashBegin = getArcLength(this.props.value || 0);
        const nowDashBegin = this.state.circleStrokeDashBegin;
        newState.circleStrokeDashBegin = lerp(nowDashBegin, targetDashBegin, 0.01 * delayTime);

        newState.circleStrokeDashoffset = lerp(this.state.circleStrokeDashoffset, 0.0, 0.002 * delayTime);
        newState.mode = typeof this.props.value === 'undefined' ? 'indeterminate' : 'determinate';
      }
      this.setState(newState);
    }
    this.lastUpdateTime = Date.now();
    this.updateAnimationFrameRequest =
      requestAnimationFrame(() => this.updateAnimate());
  }
}
