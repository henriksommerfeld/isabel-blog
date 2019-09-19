import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints, fonts, layout } from '../constants';
import { Link, graphql, useStaticQuery } from 'gatsby';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import PortraitSmall from './PortraitSmall';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

export default function Header({ location }: any) {
  const data = useStaticQuery(pageQuery);
  const { heading, image } = data.markdownRemark.frontmatter;
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible((x: boolean) => !x);
  const isStartPage = location && location.pathname === '/';
  const ignoreClickClassName = 'ignoreCloseHamburgerMenuClick';

  return (
    <>
      <NavStyled>
        <NavWidthConstrainer>
          {isStartPage ? (
            <EmptyDiv />
          ) : (
            <SiteTitle>
              <PortraitLink to="/" aria-label="till startsidan">
                <PortraitSmall image={image} />
              </PortraitLink>
              <Isabel>{heading}</Isabel>
            </SiteTitle>
          )}

          <HamburgerMenuIcon
            isOpen={mobileMenuIsVisible}
            clickAction={toggleMenu}
            className={ignoreClickClassName}
          />

          <DesktopMenu location={location} />
        </NavWidthConstrainer>
      </NavStyled>

      <MobileMenu
        isVisible={mobileMenuIsVisible}
        setIsVisible={setMobileMenuIsVisible}
        ignoreClickClassName={ignoreClickClassName}
        location={location}
      />
    </>
  );
}

const pageQuery = graphql`
  query IndexPageData {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heading
        image {
          childImageSharp {
            fluid(maxWidth: 50, quality: 80) {
              src
              srcSet
              aspectRatio
              sizes
              base64
            }
          }
        }
      }
    }
  }
`;

export const headerHeight = '80px';

const EmptyDiv = styled('div')`
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const SiteTitle = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PortraitLink = styled(Link)`
  &,
  &:visited,
  &:hover,
  &:active,
  &:focus {
    background: none;
  }
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
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.5);
  z-index: 2;
  height: ${headerHeight};
`;

const NavWidthConstrainer = styled(({ centered, ...restProps }) => (
  <div {...restProps} />
))`
  width: 100%;
  max-width: ${layout.contentMaxWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  @media (min-width: ${breakpoints.medium}) {
    justify-content: ${props => (props.centered ? 'center' : 'space-between')};
  }
`;
