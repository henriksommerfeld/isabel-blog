import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './Footer';
import useSiteMetadata from './SiteMetadata';
import { withPrefix } from 'gatsby';
import { colors, breakpoints, spacing } from '../constants';
import Header from './Header';
import { tailwindColors } from '../tailwind-colors';
import { SearchResult } from './SearchResult';
import { WindowLocation } from '@reach/router';

interface TemplateWrapperProps {
  children: ReactNode;
  location: WindowLocation;
  editLink?: string;
  language?: string;
  showTweets?: boolean;
}

export default function TemplateWrapper({
  children,
  location,
  editLink,
  showTweets,
}: TemplateWrapperProps) {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="sv" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title || ''} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <GlobalStyle />
      <Page>
        <Header location={location} />

        <Body>{children}</Body>
        <Footer editLink={editLink} showTweets={showTweets} />
      </Page>
      <SearchResult location={location} />
    </>
  );
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  body:not(.keyboard-navigation) * {
    outline: none;
  }
  ::selection {
    background-color: ${colors.selectionBackground};
    color: ${colors.white};
  }
  a {
    color: ${colors.link};
    transition: color, text-shadow, background 150ms ease-out, outline 60ms;
    background: linear-gradient(
    to right,
    ${tailwindColors.red700} 0%,
    ${tailwindColors.red400} 50%,
    ${tailwindColors.red700} 100%
    );
    background-position-x: left;
    background-position-y: 97%;
    background-repeat: repeat;
    background-size: auto;
    background-size: 0px 2px;
    background-repeat: no-repeat;
  }
  a:visited {
    color: ${colors.linkVisited};
  }
  a:focus, a:active, a:hover {
    color: ${colors.linkFocus};
    background-size: 100% 2px;

  }
  .screen-reader-text {
    display: none;
  }
  .gatsby-resp-image-background-image, .gatsby-resp-image-image, .featured-thumbnail {
    margin: 0;
    padding: 4px;
    box-shadow: rgba(34, 25, 25, 0.4) 0 1px 3px !important;
    background-color: #fff;
  }
`;

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`;

const Page = styled('div')`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: ${colors.white};

  @media (min-width: ${breakpoints.medium}) {
    background-color: ${colors.pageBackground};
  }

  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: top center;
  background-size: cover;
`;
