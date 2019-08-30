import React, { ReactNode, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import useSiteMetadata from './SiteMetadata';
import { withPrefix, Link } from 'gatsby';
import { Jsx } from '../../my-graphql';
import { colors } from '../variables';
import violetForrest from '../../static/img/photo-1563206706-37fc22744de1.jpg';
import Header from './Header';

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
        <Header />

        <Body>{children}</Body>
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

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  /* border: red dashed 2px; */
`;

const Page = styled('div')`
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  /* background-color: #f8f8f8; */
  background-color: white;

  /*  */
  /* background-image: url(${greenBlur}); */

  /* Lila-rosa med skog i siluett */
  /* background-image: url(${violetForrest}); */

  /* Sädesåker */
  /* background-image: url('https://images.unsplash.com/photo-1421435371524-d26441ec7dda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'); */
  
  
  /*Svart-vit målning */
  /* background-image: url('https://images.unsplash.com/photo-1505562130589-9879683e72da?ixlib=rb-1.2.1&auto=format&q=80'); */

  /* Blå trävägg */
  /* background-image: url('https://images.unsplash.com/photo-1460602594182-8568137446ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&q=80');   */

  /* Blå trävägg suddig */
  /* background-image: url(${blueWoodBlur});   */


/* Guld */
/* background-image: url('https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&q=80'); */
/* background-image: url(${blur200}); */

/* background-image: linear-gradient(#B2F5EA, #234E52 60%); */

background-repeat: repeat-x;
background-attachment: fixed;
background-position: top center;
background-size: cover;
`;
