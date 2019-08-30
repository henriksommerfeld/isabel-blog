import React from 'react';
import { useSpring, animated, config } from 'react-spring';

export default function HamburgerMenuIcon({ isOpen, clickAction }: Hamburger) {
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
    >
      <animated.rect width="40" height="6" rx="1" transform={top} />
      <animated.rect width="40" height="6" rx="1" transform={center} />
      <animated.rect width="40" height="6" rx="1" transform={bottom} />
    </animated.svg>
  );
}

interface Hamburger {
  isOpen: boolean;
  clickAction: any;
}

const hamburgerStyle = {
  top: 'translate(2, 7) rotate(0)',
  center: 'translate(2, 19) rotate(0)',
  bottom: 'translate(2, 31) rotate(0)',
  color: '#fff',
};

const crossStyle = {
  top: 'translate(5, 32) rotate(-45)',
  center: 'translate(10, 4) rotate(45)',
  bottom: 'translate(5, 32) rotate(-45)',
  color: 'lightblue',
};
