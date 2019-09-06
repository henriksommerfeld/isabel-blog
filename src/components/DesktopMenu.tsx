import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { navLinks, colors } from '../constants';
import { tailwindColors } from '../tailwind-colors';

export default function DesktopMenu({ location }: any) {
  return (
    <MenuStyled>
      {navLinks.map(link => (
        <LinkStyled
          to={link.url}
          key={link.url}
          isActive={matchesRoute(location.pathname, link.url)}
        >
          {link.title}
        </LinkStyled>
      ))}
    </MenuStyled>
  );
}

function matchesRoute(currentPath: string, path: string): boolean {
  if (!currentPath || !path) return false;
  if (currentPath === path) return true;

  const currentPathWithoutTrailingSlash = currentPath.replace(/\/$/, '');
  const pathWithoutTrailingSlash = path.replace(/\/$/, '');

  if (currentPathWithoutTrailingSlash === pathWithoutTrailingSlash) return true;

  if (currentPath.startsWith('/20') && path === '/publicerat') return true;

  return false;
}

const MenuStyled = styled('div')``;

const LinkStyled = styled(({ isActive, ...restProps }) => (
  <Link {...restProps} />
))`
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
  background-position-y: 90%;
  background-repeat: repeat;
  background-size: auto;
  background-size: 0px 3px;
  background-repeat: no-repeat;

  &,
  &:visited {
    color: ${colors.white};
    text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    background-size: ${props =>
      props.isActive ? `calc(100% - 2em) 3px` : `0px 3px`};
  }

  &:hover {
    color: ${colors.white};
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 30px white;
    background-size: calc(100% - 2em) 3px;
  }
`;
