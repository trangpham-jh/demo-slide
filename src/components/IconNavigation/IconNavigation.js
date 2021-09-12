import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './IconNavigation.module.css';

const IconNavigation = props => {
  const {
    rootClassName,
    className,
    onClick,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      onClick={onClick}
      width="15"
      height="25"
      viewBox="0 0 15 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.5405 25L15 21.2529L6.91892 12.5L15 3.74707L11.5405 3.02436e-07L-1.3911e-07 12.5L11.5405 25Z" fill="#414146" />
    </svg>
  );
};

IconNavigation.defaultProps = {
  rootClassName: null,
  className: null
};

const { string, arrayOf, func } = PropTypes;

IconNavigation.propTypes = {
  rootClassName: string,
  className: string,
  onClick: func,
};

export default IconNavigation;

export const IconPrev = props => (
  <IconNavigation rootClassName={css.prev} {...props} />
);
IconPrev.displayName = 'IconPrev';

export const IconNext = props => (
  <IconNavigation rootClassName={css.next} {...props} />
);
IconNext.displayName = 'IconNext';