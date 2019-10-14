import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PublishedPageTemplate } from './published-page-template';
import { LocationProp } from '../interfaces/LocationProp';

export default function PublishedPage({ location }: LocationProp) {
  const data = useStaticQuery(publishedPageQuery);
  const content = data.markdownRemark.html;
  const pageName = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;

  return (
    <Layout
      location={location}
      editLink={editPageUrl('published')}
      pageTitle={pageName}
      pageDescription={description}
    >
      <PublishedPageTemplate
        contentComponent={HTMLContent}
        title={pageName}
        content={content}
        imageFile={data.fileName}
        location={location}
      />
    </Layout>
  );
}

const publishedPageQuery = graphql`
  query PublishedPage {
    markdownRemark(frontmatter: { templateKey: { eq: "published-page" } }) {
      html
      frontmatter {
        title
        description
      }
    }
    fileName: file(
      relativePath: { eq: "hidden/roman-kraft-_Zua2hyvTBk-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 5000) {
          src
          srcSet
          aspectRatio
          sizes
          base64
        }
      }
    }
  }
`;
