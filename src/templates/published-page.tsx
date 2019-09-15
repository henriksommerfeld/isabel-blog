import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import PublishedPageTemplate from './published-page-template';

export default function PublishedPage({ location }) {
  const { markdownRemark: page } = useStaticQuery(publishedageQuery);
  const content = page.html;
  const title = page.frontmatter.title;

  return (
    <Layout location={location} editLink={editPageUrl('published')}>
      <PublishedPageTemplate title={title} content={content} />
    </Layout>
  );
}

const publishedageQuery = graphql`
  query PublishedPage {
    markdownRemark(frontmatter: { templateKey: { eq: "published-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
