import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Footer from './Footer';
import useSiteMetadata from './SiteMetadata';
import { colors, breakpoints } from '../constants';
import Header from './Header';
import SearchResult from './SearchResult';
import { WindowLocation } from '@reach/router';
import { GlobalStyles } from '../global-styles';

interface TemplateWrapperProps {
  children: ReactNode;
  location: WindowLocation;
  pageTitle: string;
  pageDescription?: string;
  pageLanguage?: string;
  editLink?: string;
  language?: string;
  showTweets?: boolean;
}

export default function TemplateWrapper({
  children,
  location,
  pageTitle,
  pageDescription = '',
  pageLanguage = 'sv',
  editLink,
  showTweets,
}: TemplateWrapperProps) {
  const { title } = useSiteMetadata();
  const finalTitle = pageTitle ? `${pageTitle} | ${title}` : title;
  const baseUrl = 'https://www.isabelsommerfeld.com';
  const canonical = `${baseUrl}${location.pathname}`;
  const locale = pageLanguage === 'en' ? 'en_US' : 'sv_SE';

  return (
    <>
      <Helmet defer={false}>
        <html lang={pageLanguage} />
        <title>{finalTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={locale} />

        {pageDescription && (
          <meta property="og:description" content={pageDescription} />
        )}

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@isommerfeld"></meta>

        <meta property="og:image" content={`${baseUrl}/img/favimage.jpg`} />
        <link rel="canonical" href={canonical} />
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
