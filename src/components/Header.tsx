import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../variables';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import { useSpring, animated, config } from 'react-spring';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import PortraitSmall from './PortraitSmall';

export default function Header() {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible(x => !x);
  const showPortrait = location.pathname !== '/';
  const spring = useSpring({
    from: {
      transform: mobileMenuIsVisible ? 'translateY(0)' : 'translateY(-100%)',
    },
    to: {
      transform: !mobileMenuIsVisible ? 'translateY(0)' : 'translateY(-100%)',
    },
  });

  return (
    <NavStyled>
      <HeaderLink to="/" aria-label="till startsidan">
        {showPortrait ? <PortraitSmall /> : null}
        <Isabel>Isabel Sommerfeld</Isabel>
      </HeaderLink>
      <HamburgerMenuIcon
        isOpen={mobileMenuIsVisible}
        clickAction={toggleMenu}
      />
      <animated.div style={spring}>
        <Link to="/om">Om mig</Link>
        <Link to="/publicerat">Publicerat</Link>
        <Link to="/blog">Pressbilder</Link>
      </animated.div>
    </NavStyled>
  );
}

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
  z-index: 1;
`;
