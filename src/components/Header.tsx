import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints, fonts } from '../constants';
import { Link } from 'gatsby';
import useSiteMetadata from './SiteMetadata';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import PortraitSmall from './PortraitSmall';
import MobileMenu from './MobileMenu';
import useWindowSize from '../useWindowSize';
import DesktopMenu from './DesktopMenu';

export default function Header({ location }: any) {
  const { title } = useSiteMetadata();
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible((x: boolean) => !x);
  const windowSize = useWindowSize();
  const isStartPage = location.pathname === '/';
  const ignoreClickClassName = 'ignoreCloseHamburgerMenuClick';

  function isMobile() {
    return windowSize.width <= breakpoints.mediumAsNumber;
  }

  return (
    <>
      <NavStyled>
        <NavWidthConstrainer centered={isStartPage && !isMobile()}>
          {isStartPage ? (
            <div />
          ) : (
            <SiteTitle>
              <Link to="/" aria-label="till startsidan">
                <PortraitSmall />
              </Link>
              <Isabel>{title}</Isabel>
            </SiteTitle>
          )}
          {windowSize.width > breakpoints.mediumAsNumber ? (
            <DesktopMenu location={location} />
          ) : (
            <HamburgerMenuIcon
              isOpen={mobileMenuIsVisible}
              clickAction={toggleMenu}
              className={ignoreClickClassName}
            />
          )}
        </NavWidthConstrainer>
      </NavStyled>

      {isMobile() ? (
        <MobileMenu
          isVisible={mobileMenuIsVisible && isMobile()}
          setIsVisible={setMobileMenuIsVisible}
          ignoreClickClassName={ignoreClickClassName}
          location={location}
        />
      ) : null}
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
  font-family: ${fonts.headingFamily};
  color: white;
  margin-right: 1rem;
`;

const NavStyled = styled('nav')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${colors.headerBackground};
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.8);
  z-index: 2;
  height: ${headerHeight};
`;

const NavWidthConstrainer = styled(({ centered, ...restProps }) => (
  <div {...restProps} />
))`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.centered ? 'center' : 'space-between')};
  align-items: center;
  padding: 1rem;
`;
