import React from 'react';
import { useSpring, animated } from 'react-spring';
import { colors } from '../constants';

export default function HamburgerMenuIcon({
  isOpen,
  clickAction,
  className,
}: Hamburger) {
  const { top, center, bottom, color } = useSpring({
    to: isOpen ? crossStyle : hamburgerStyle,
  });
  return (
    <animated.svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={clickAction}
      className={className}
    >
      <animated.rect
        width="40"
        height="6"
        rx="1"
        transform={top}
        className={className}
      />
      <animated.rect
        width="40"
        height="6"
        rx="1"
        transform={center}
        className={className}
      />
      <animated.rect
        width="40"
        height="6"
        rx="1"
        transform={bottom}
        className={className}
      />
    </animated.svg>
  );
}

interface Hamburger {
  isOpen: boolean;
  clickAction: any;
  className: string;
}

const hamburgerStyle = {
  top: 'translate(2, 7) rotate(0)',
  center: 'translate(2, 19) rotate(0)',
  bottom: 'translate(2, 31) rotate(0)',
  color: colors.white,
};

const crossStyle = {
  top: 'translate(5, 32) rotate(-45)',
  center: 'translate(10, 4) rotate(45)',
  bottom: 'translate(5, 32) rotate(-45)',
  color: colors.mobileMenuIconOpen,
};
