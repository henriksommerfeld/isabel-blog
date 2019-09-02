import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import BlogRoll from '../components/BlogRoll';
import styled from 'styled-components';
import { spacing, colors } from '../constants';
import Content, { HTMLContent } from '../components/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  description,
  isPreview = false,
}) => (
  <div>
    <div
      style={{
        background: colors.headerBackground,
        paddingBottom: '5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PortraitLarge
        imageInfo={image}
        style={{
          borderRadius: '50%',
          border: '0.5em solid white',
          width: '280px',
          margin: '2rem 0',
        }}
      />
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '0px',
          padding: '3rem 1rem',
          // border: '9px solid white',
          width: '100%',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>{heading}</h1>
        <h2>{subheading}</h2>
        {isPreview ? (
          <Content content={description} />
        ) : (
          <HTMLContent content={description} />
        )}
      </div>
    </div>
    <div style={{ width: '100%' }}>{isPreview ? null : <BlogRoll />}</div>
  </div>
);

const PortraitLarge = styled(PreviewCompatibleImage)`
  border: 0.5em solid white;
  box-shadow: 0 0 1em black;
  border-radius: 100%;
  width: 280px;
  margin: 2rem 0;
`;

export default function IndexPage({ data, location }) {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout location={location}>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={html}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 300, quality: 100) {
              src
              srcSet
              aspectRatio
              sizes
              base64
            }
          }
        }
        heading
        subheading
      }
    }
  }
`;
