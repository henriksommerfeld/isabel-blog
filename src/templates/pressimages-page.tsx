import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PressImagesPageTemplate } from './pressimages-page-template';

export default function PressImagesPage({ location }) {
  const { markdownRemark: page } = useStaticQuery(pressImagesPageQuery);
  const content = page.html;
  const title = page.frontmatter.title;
  const image = page.frontmatter.image;

  return (
    <Layout location={location} editLink={editPageUrl('pressimages')}>
      <PressImagesPageTemplate
        contentComponent={HTMLContent}
        title={title}
        content={content}
        image={image}
      />
    </Layout>
  );
}

const pressImagesPageQuery = graphql`
  query PressImagesPage {
    markdownRemark(frontmatter: { templateKey: { eq: "pressimages-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80) {
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
