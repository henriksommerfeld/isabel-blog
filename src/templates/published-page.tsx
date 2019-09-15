import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PublishedPageTemplate } from './published-page-template';

export default function PublishedPage({ location }) {
  const { markdownRemark: page } = useStaticQuery(publishedageQuery);
  const content = page.html;
  const title = page.frontmatter.title;
  const image = page.frontmatter.image;

  return (
    <Layout location={location} editLink={editPageUrl('published')}>
      <PublishedPageTemplate
        contentComponent={HTMLContent}
        title={title}
        content={content}
        image={image}
      />
    </Layout>
  );
}

const publishedageQuery = graphql`
  query PublishedPage {
    markdownRemark(frontmatter: { templateKey: { eq: "published-page" } }) {
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
