import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './styles.module.css';
import { IconNext, IconPrev } from './components/IconNavigation/IconNavigation';
import IconSpinner from './components/IconSpinner/IconSpinner';

const KEY_CODE_LEFT_ARROW = 37;
const KEY_CODE_RIGHT_ARROW = 39;
const PADDING_IMAGE_SCROLL = 20;
const LIMIT_DISPLAYED_IMAGES_IN_SLIDE = 5;

class SlideImage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImageIndex: 0, selectedImageLoaded: false };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.scrollListThumbnails = this.scrollListThumbnails.bind(this)
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT_ARROW) {
      this.prev();
    } else if (e.keyCode === KEY_CODE_RIGHT_ARROW) {
      this.next();
    }
  }

  prev() {
    this.setState(prevState => {
      const newIndex = prevState.selectedImageIndex - 1;
      if (newIndex < 0) {
        return;
      }
      if (newIndex < LIMIT_DISPLAYED_IMAGES_IN_SLIDE) {
        this.scrollListThumbnails(-1);
      }
      return { selectedImageIndex: newIndex, selectedImageLoaded: false };
    });
  }

  next() {
    this.setState(prevState => {
      const newIndex = prevState.selectedImageIndex + 1;
      if (newIndex === this.props.images.length) {
        return;
      }
      if (newIndex >= LIMIT_DISPLAYED_IMAGES_IN_SLIDE) {
        this.scrollListThumbnails(1);
      }
      return { selectedImageIndex: newIndex, selectedImageLoaded: false };
    });
  }

  scrollListThumbnails(direction) {
    const slideElement = this.sliderRef.current;
    const far = slideElement.offsetWidth * direction;
    const pos = slideElement.scrollLeft + far + PADDING_IMAGE_SCROLL * direction;
    slideElement.scrollLeft = pos;
    slideElement.animate({ scrollLeft: pos }, 1000);
  }

  render() {
    const {
      rootClassName,
      className,
      images,
      alt,
      intl,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const prevButton =
      images.length > LIMIT_DISPLAYED_IMAGES_IN_SLIDE
        ? <IconPrev className={css.prevFeatureImage} onClick={this.prev} />
        : null;
    const nextButton =
      images.length > LIMIT_DISPLAYED_IMAGES_IN_SLIDE
        ? <IconNext className={css.nextFeatureImage} onClick={this.next} />
        : null;

    const prevListThumbnailsBtn =
      images.length > LIMIT_DISPLAYED_IMAGES_IN_SLIDE
        ? <IconPrev className={css.prevThumbnails} onClick={this.scrollListThumbnails.bind(null, -1)} />
        : null;
    const nextListThumbnailsBtn =
      images.length > LIMIT_DISPLAYED_IMAGES_IN_SLIDE
        ? <IconNext className={css.nextThumbnails} onClick={this.scrollListThumbnails.bind(null, 1)} />
        : null;

    const markImageLoaded = index => () => {
      this.setState(prevState => {
        if (prevState.selectedImageIndex === index) {
          // Only mark the image loaded if the current index hasn't
          // changed, i.e. user hasn't already changed to another
          // image index.
          return { selectedImageLoaded: true };
        }
        return {};
      });
    };

    const currentImageIsLoaded = images.length === 0 || this.state.selectedImageLoaded;
    const loadingIconClasses = classNames(css.loading, {
      [css.loadingVisible]: !currentImageIsLoaded,
    });
    const imageClasses = classNames(css.featureImage, {
      [css.imageLoading]: !currentImageIsLoaded,
    });

    return (
      <div className={classes}>
        <div className={css.imageWrapper}>
          <IconSpinner className={loadingIconClasses} />        
          <img
            className={imageClasses}
            src={images[this.state.selectedImageIndex]}
            alt={alt}
            onLoad={markImageLoaded(this.state.selectedImageIndex)}
            onError={markImageLoaded(this.state.selectedImageIndex)}
          />
          {prevButton}
          {nextButton}
        </div>

        <div className={css.listThumbnails}>
          <div className={css.wrapperThumbnails}>
            <div className={css.imageContainer} ref={this.sliderRef}>
              {images.map((image, index) => {
                return (
                  <div
                    key={`ListThumbnails${index}`}
                    className={css.wrapImageThumbnail}
                    onClick={() => this.setState({ selectedImageIndex: index })}
                  >
                    {index !== this.state.selectedImageIndex &&
                      <div className={css.overlay} />
                    }
                    <img
                      className={css.imageThumbnail}
                      src={image}
                      alt={alt}
                      onLoad={markImageLoaded(this.state.selectedImageIndex)}
                      onError={markImageLoaded(this.state.selectedImageIndex)}
                    />
                  </div>
                );
              })}
            </div>
            {prevListThumbnailsBtn}
            {nextListThumbnailsBtn}
          </div>
        </div>
      </div>
    );
  }
}

SlideImage.defaultProps = {
  rootClassName: null,
  className: null,
  images: [],
};

const { string, array, func } = PropTypes;

SlideImage.propTypes = {
  rootClassName: string,
  className: string,
  images: array.isRequired,
  handleViewPhotosClick: func.isRequired,

};

export default SlideImage;