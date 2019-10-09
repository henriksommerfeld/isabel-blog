import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Footer from './Footer';
import useSiteMetadata from './SiteMetadata';
import { withPrefix } from 'gatsby';
import { colors, breakpoints } from '../constants';
import Header from './Header';
import { SearchResult } from './SearchResult';
import { WindowLocation } from '@reach/router';
import { GlobalStyles } from '../global-styles';

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
      <Helmet defer={false}>
        <html lang="sv" />
        <title>{title}</title>
        <meta name="description" content={description || ''} />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title || ''} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        <link
          rel="canonical"
          href={`http://www.isabelsommerfeld.com/${location.pathname}`}
        />
      </Helmet>
      <GlobalStyles />
      <Page>
        <Header location={location} />

        <Body>{children}</Body>
        <Footer editLink={editLink} showTweets={showTweets} />
      </Page>
      <SearchResult location={location} />
    </>
  );
}

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
