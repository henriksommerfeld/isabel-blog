import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useOnClickOutside from 'use-onclickoutside';
import { headerHeight } from './Header';
import { navLinks, colors } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { matchesRoute } from '../active-node';

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
      {navLinks.map(link => (
        <MobileLink
          to={link.url}
          key={link.url}
          isActive={matchesRoute(location.pathname, link.url)}
        >
          {link.title}
        </MobileLink>
      ))}
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
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid ${tailwindColors.gray100};
`;

const MobileLink = styled(({ isActive, ...restProps }) => (
  <Link {...restProps} />
))`
  padding: 1rem;
  font-size: 1.1em;
  text-align: center;
  display: inline;
  font-weight: ${props => (props.isActive ? `bold` : `normal`)};

  :hover {
    background: ${colors.mobileMenuBackgroundHover};
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