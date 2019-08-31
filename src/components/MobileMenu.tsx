import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useOnClickOutside from 'use-onclickoutside';
import { headerHeight } from './Header';

export default function MobileMenu({
  isVisible,
  setIsVisible,
  ignoreClickClassName,
}) {
  const menuRef = useRef(null);
  const pullDownAnimation = useSpring({
    to: {
      transform: isVisible
        ? `translateY(${headerHeight})`
        : `translateY(-${mobileMenuHeight})`,
    },
  });

  useOnClickOutside(menuRef, e => {
    if (!hasClass(e, ignoreClickClassName)) setIsVisible(false);
  });

  return (
    <MobileMenuStyled ref={menuRef} style={pullDownAnimation}>
      <MobileLink to="/om">1</MobileLink>
      <MobileLink to="/publicerat">2</MobileLink>
      <MobileLink to="/blog">3</MobileLink>
      <MobileLink to="/om">4</MobileLink>
      <MobileLink to="/publicerat">5</MobileLink>
      <MobileLink to="/blog">6</MobileLink>
      <MobileLink to="/om">7</MobileLink>
      <MobileLink to="/publicerat">8</MobileLink>
      <MobileLink to="/blog">9</MobileLink>
    </MobileMenuStyled>
  );
}

const mobileMenuHeight = '500px';

const MobileMenuStyled = styled(animated.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  z-index: 1;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(-${mobileMenuHeight});
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
`;

const MobileLink = styled(Link)`
  padding: 1rem;
  text-align: center;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

function hasClass(e: any, className: string): boolean {
  return (
    e &&
    e.target &&
    e.target.classList &&
    e.target.classList.contains &&
    e.target.classList.contains(className)
  );
}
