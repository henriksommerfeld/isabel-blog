import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../constants';
import { Link } from 'gatsby';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import PortraitSmall from './PortraitSmall';
import MobileMenu from './MobileMenu';
import useWindowSize from '../useWindowSize';

export default function Header({ location }: any) {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible((x: boolean) => !x);
  const windowSize = useWindowSize();
  const isStartPage = location.pathname === '/';
  const ignoreClickClassName = 'ignoreCloseHamburgerMenuClick';

  return (
    <>
      <NavStyled>
        {isStartPage ? (
          <div />
        ) : (
          <SiteTitle>
            <Link to="/" aria-label="till startsidan">
              <PortraitSmall />
            </Link>
            <Isabel>Isabel Sommerfeld</Isabel>
          </SiteTitle>
        )}
        {windowSize.width > breakpoints.mediumAsNumber ? null : (
          <HamburgerMenuIcon
            isOpen={mobileMenuIsVisible}
            clickAction={toggleMenu}
            className={ignoreClickClassName}
          />
        )}
      </NavStyled>
      {windowSize.width > breakpoints.mediumAsNumber ? null : (
        <MobileMenu
          isVisible={mobileMenuIsVisible}
          setIsVisible={setMobileMenuIsVisible}
          ignoreClickClassName={ignoreClickClassName}
        />
      )}
    </>
  );
}

export const headerHeight = '80px';

const SiteTitle = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Isabel = styled('div')`
  font-size: 1.3rem;
  font-family: 'Domine', 'sans-serif';
  color: white;
  margin-right: 1rem;
`;

const NavStyled = styled('nav')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${colors.headerBackground};
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.5);
  z-index: 2;
  height: ${headerHeight};
`;
