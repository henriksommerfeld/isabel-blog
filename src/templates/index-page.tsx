import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { editPageUrl } from '../url-replacer';

import Layout from '../components/Layout';
import { IndexPageTemplate } from './index-page-template';

export default function IndexPage({ location }) {
  const data = useStaticQuery(pageQuery);
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout location={location} editLink={editPageUrl('index')}>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={html}
      />
    </Layout>
  );
}

const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
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
