import React from 'react';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import { withStyles, css } from 'withStyles';
import mergeProps from 'utils/mergeProps';
import aki from 'node-aki';
import { IProgressEvent } from 'node-aki/lib/interface';
import CircularProgress from 'components/Progress/CircularProgress';
import { returntypeof } from 'react-redux-typescript';
import FadeIn from 'components/FadeIn/hoc';

interface IProps {
  image: IImageResource;
  width?: number | string;
  height?: number | string;
  progress?: boolean;
}

const IImageFetchPromiseType = returntypeof(aki.image);
type IImageFetchPromise = typeof IImageFetchPromiseType;

const ImgWithFadeIn = FadeIn((props) => <img {...props} />);

@withStyles(({ }) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    background: '#fafafa'
  },
  thumb: {
    position: 'relative'
  },
  float: {
    position: 'absolute',
    top: '0px',
    left: '0px'
  },
  progressContainer: {
    display: 'inline-flex',
    background: 'rgba(0,0,0,.20)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    willChange: 'opacity'
  },
  progressDone: {
    opacity: 0,
    transition: 'opacity 300ms',
    transitionDelay: '500ms'
  },
  progress: {
    width: '20%',
    height: '20%',
    minWidth: '40px',
    minHeight: '40px'
  }
}))
export default class Reimg
  extends React.PureComponent<IWithStyleProps & React.HTMLProps<HTMLElement> & IProps> {

  state: {
    progress?: number;
    ready: boolean;
    start: boolean;
    imageObjectURL?: string;
  } = {
      ready: false,
      start: false
    };

  thumbCanvas: HTMLCanvasElement;

  imageFetchPromise: IImageFetchPromise;

  renderThumbImage() {
    const thumbImage = new Image();
    thumbImage.addEventListener('load', () => {
      const context = this.thumbCanvas.getContext('2d');
      context.drawImage(thumbImage, 0, 0, this.props.image.width, this.props.image.height);
    });
    thumbImage.src = this.props.image.thumb;
  }

  handleUpdateProgress(e: IProgressEvent) {
    if (this.props.progress) {
      this.setState({
        ...this.state,
        progress: e.percent
      });
    }
  }

  fetchImage() {
    this.setState({
      ...this.state,
      start: true
    });
    this.imageFetchPromise = aki
      .image(this.props.image.src, (e) => this.handleUpdateProgress(e));
    this.imageFetchPromise.then((r) => {
      this.setState({
        ...this.state,
        ready: true,
        imageObjectURL: r.res
      });
    });
  }

  componentDidMount() {
    this.renderThumbImage();
    this.fetchImage();
  }

  componentWillUnmount() {
    if (this.imageFetchPromise) { this.imageFetchPromise.cancel(); }
  }

  public render() {
    const {
      image,
      styles,
      theme,
      height: customHeight,
      width: customWidth,
      progress,
      ...otherProps
    } = this.props;
    const inheritSize = {
      height: 'inherit',
      width: 'inherit'
    };
    const thumb = image.thumb &&
      (
        <canvas
          ref={(canvas) => this.thumbCanvas = canvas}
          width={image.width}
          height={image.height}
          {...css(inheritSize, styles.thumb)}
        />
      );
    const img = this.state.ready &&
      <ImgWithFadeIn src={this.state.imageObjectURL} {...css(inheritSize, styles.float)} />;
    const loadProgress = progress && (
      <div
        {...css(inheritSize,
          styles.float,
          styles.progressContainer,
          this.state.progress === 1 && styles.progressDone) }
      >
        <CircularProgress
          color='#fff'
          value={this.state.progress}
          {...css(styles.progress)}
        />
      </div>
    );
    return (
      <div
        {...mergeProps(css({ width: customWidth, height: customHeight }, styles.root), otherProps)}
      >
        {thumb}
        {img}
        {loadProgress}
      </div>
    );
  }
}
