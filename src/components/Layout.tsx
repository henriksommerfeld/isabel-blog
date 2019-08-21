import React, { ReactNode, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import useSiteMetadata from './SiteMetadata';
import { withPrefix, Link } from 'gatsby';
import { Jsx } from '../../my-graphql';

interface TemplateWrapperProps {
  children: ReactNode;
}

export default function TemplateWrapper({
  children,
}: TemplateWrapperProps): Jsx {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description || undefined} />

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
        {/* <Navbar /> */}
        <Header>
          <div>{title}</div>{' '}
          <nav>
            <Link to="/">Startsida</Link>
            <Link to="/about">Publicerat</Link>
            <Link to="/about">Om mig</Link>
            <Link to="/about">Pressbilder</Link>
          </nav>
        </Header>
        <Body>BODY</Body>
        <Footer />
      </Page>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Header = styled('header')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: dashed blue 2px;
`;

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  border: red dashed 2px;
`;

const Page = styled('div')`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f8f8f8;
`;
