import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../variables';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import PortraitSmall from './PortraitSmall';
import useOnClickOutside from 'use-onclickoutside'
// https://www.npmjs.com/package/react-onclickoutside

export default function Header({ location }: any) {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible((x: boolean) => !x);
  const showPortrait = location.pathname !== '/';
  
  

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
          className="ignore-onOutsideClick"
        />
      </NavStyled>
      <MobileMenu isVisible={mobileMenuIsVisible} setIsVisible={setMobileMenuIsVisible} />
    </>
  );
}

const headerHeight = '80px';
const mobileMenuHeight = '500px';

function hasClass(e, className): boolean {
console.log('e', e);
 return e.target && e.target.className && e.target.className.includes(className);
}

function MobileMenu({isVisible, setIsVisible}) {
  const menuRef = useRef(null);
  const pullDownAnimation = useSpring({
    to: {
      transform: isVisible
      ? `translateY(${headerHeight})`
      : `translateY(-${mobileMenuHeight})`,
    },
  });
  

  useOnClickOutside(menuRef, e => {
    if (!hasClass(e, 'ignore-onOutsideClick')) 
    setIsVisible(false);
  })

  return (<MobileMenuStyled ref={menuRef} style={pullDownAnimation}>
    <MobileLink to="/om">1</MobileLink>
    <MobileLink to="/publicerat">2</MobileLink>
    <MobileLink to="/blog">3</MobileLink>
    <MobileLink to="/om">4</MobileLink>
    <MobileLink to="/publicerat">5</MobileLink>
    <MobileLink to="/blog">6</MobileLink>
    <MobileLink to="/om">7</MobileLink>
    <MobileLink to="/publicerat">8</MobileLink>
    <MobileLink to="/blog">9</MobileLink>
  </MobileMenuStyled>)
}

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
