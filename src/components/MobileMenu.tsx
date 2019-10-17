import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useOnClickOutside from 'use-onclickoutside';
import { headerHeight } from './Header';
import { navLinks, colors, zIndexes } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { matchesRoute } from '../active-node';
import { WindowLocation } from '@reach/router';
import { useGlobal } from 'reactn';
import { SearchRoute, SearchQuery, SearchResults } from './Searchbox';

interface MobileMenuProps {
  isVisible: boolean;
  setIsVisible: Function;
  ignoreClickClassName: string;
  location: WindowLocation;
}

export default function MobileMenu({
  isVisible,
  setIsVisible,
  ignoreClickClassName,
  location,
}: MobileMenuProps) {
  const [, setResults] = useGlobal<SearchResults>('searchResults');
  const [, setRoute] = useGlobal<SearchRoute>('searchRoute');
  const [, setQuery] = useGlobal<SearchQuery>('searchQuery');
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

  const closeSearch = () => {
    setRoute('');
    setQuery('');
    setResults([]);
  };

  return (
    <MobileMenuStyled
      ref={menuRef}
      style={pullDownAnimation}
      aria-hidden="true"
    >
      {navLinks.map(link => (
        <MobileLink
          to={link.url}
          key={link.url}
          isActive={matchesRoute(location, link.url)}
          onClick={closeSearch}
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
  z-index: ${zIndexes.mobileMenu};
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
  font-size: 1.2rem;
  text-align: center;
  display: inline;
  font-weight: ${({ isActive }) => (isActive ? `bold` : `normal`)};

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
