import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import BlogRoll from '../components/BlogRoll';
import styled from 'styled-components';
import portrait from '../../static/uploads/isabel_960x960.jpg';
import { spacing, colors } from '../variables';

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  description,
  intro,
}) => (
  <div>
    <div
      style={{
        background: colors.headerBackground,
        // padding: `${spacing.paddingDouble} ${spacing.paddingDefault}`,
        paddingBottom: '5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PortraitLarge />
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
        <h1>Isabel Sommerfeld</h1>
        <h2>Jurist</h2>
        <ul>
          <li>Mänskliga rättigheter</li>
          <li>Terapeutisk juridik</li>
          <li>Corporate Social Responsibility</li>
        </ul>
      </div>
    </div>
    <div style={{ width: 'auto' }}>
      <BlogRoll />
    </div>
  </div>
);

function PortraitLarge() {
  return (
    <img
      style={{
        border: '0.5em solid white',
        boxShadow: '0 0 1em black',
        borderRadius: '100%',
        maxWidth: '280px',
        maxHeight: '280px',
        margin: '2rem 0',
      }}
      src={portrait}
    />
  );
}

export default function IndexPage({ data }) {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
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
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  src
                  srcSet
                  aspectRatio
                  sizes
                  base64
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
