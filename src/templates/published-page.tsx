import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PublishedPageTemplate } from './published-page-template';

export default function PublishedPage({ location }) {
  const data = useStaticQuery(publishedPageQuery);
  const content = data.markdownRemark.html;

  return (
    <Layout location={location} editLink={editPageUrl('published')}>
      <PublishedPageTemplate
        contentComponent={HTMLContent}
        title="Publicerat"
        content={content}
        imageFile={data.fileName}
      />
    </Layout>
  );
}

const publishedPageQuery = graphql`
  query PublishedPage {
    markdownRemark(frontmatter: { templateKey: { eq: "published-page" } }) {
      html
    }
    fileName: file(
      relativePath: { eq: "hidden/roman-kraft-_Zua2hyvTBk-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 5000, maxHeight: 3000, quality: 80) {
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
