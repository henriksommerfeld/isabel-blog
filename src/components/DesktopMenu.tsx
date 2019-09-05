import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import useOnClickOutside from 'use-onclickoutside';
import { headerHeight } from './Header';
import { navLinks, colors, spacing } from '../constants';
import { tailwindColors } from '../tailwind-colors';

export default function DesktopMenu() {
  return (
    <MenuStyled>
      {navLinks.map(link => (
        <LinkStyled to={link.url} key={link.url}>
          {link.title}
        </LinkStyled>
      ))}
    </MenuStyled>
  );
}
const MenuStyled = styled('div')``;

const LinkStyled = styled(Link)`
  font-size: 1.1em;
  padding: 1em;
  text-align: center;
  transition: color, text-shadow, background 200ms ease-out, outline 60ms;
  display: inline;
  background: linear-gradient(
    to right,
    ${tailwindColors.red800} 0%,
    ${tailwindColors.red400} 50%,
    ${tailwindColors.red800} 100%
  );
  background-position-x: center;
  background-position-y: bottom;
  background-repeat: repeat;
  background-size: auto;
  background-size: 0px 3px;
  background-repeat: no-repeat;

  &,
  &:visited {
    color: ${colors.white};
    text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    color: ${colors.white};
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 30px white;
    background-size: calc(100% - 2em) 3px;
  }
`;
