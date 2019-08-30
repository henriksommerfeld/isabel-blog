import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../variables';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import PortraitSmall from './PortraitSmall';
import onClickOutside from 'react-onclickoutside';
// https://www.npmjs.com/package/react-onclickoutside

export default function Header({ location }: any) {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible((x: boolean) => !x);
  const showPortrait = location.pathname !== '/';
  const pullDownAnimation = useSpring({
    to: {
      transform: mobileMenuIsVisible
        ? `translateY(${headerHeight})`
        : `translateY(-${mobileMenuHeight})`,
    },
  });

  return (
    <>
      <NavStyled>
        <HeaderLink to="/" aria-label="till startsidan">
          {showPortrait ? <PortraitSmall /> : null}
          <Isabel>Isabel Sommerfeld</Isabel>
        </HeaderLink>
        <HamburgerMenuIcon
          isOpen={mobileMenuIsVisible}
          clickAction={toggleMenu}
        />
      </NavStyled>
      <MobileMenu style={pullDownAnimation}>
        <MobileLink to="/om">1</MobileLink>
        <MobileLink to="/publicerat">2</MobileLink>
        <MobileLink to="/blog">3</MobileLink>
        <MobileLink to="/om">4</MobileLink>
        <MobileLink to="/publicerat">5</MobileLink>
        <MobileLink to="/blog">6</MobileLink>
        <MobileLink to="/om">7</MobileLink>
        <MobileLink to="/publicerat">8</MobileLink>
        <MobileLink to="/blog">9</MobileLink>
      </MobileMenu>
    </>
  );
}

const headerHeight = '80px';
const mobileMenuHeight = '500px';

const MobileMenu = styled(animated.div)`
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

const HeaderLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Isabel = styled('div')`
  font-size: 1.2rem;
  font-family: 'Domine', 'sans-serif';
  color: white;
`;

const NavStyled = styled('nav')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${colors.headerBackground};
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
  height: ${headerHeight};
`;
