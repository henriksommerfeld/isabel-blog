import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PublishedPageTemplate } from './published-page-template';
import Helmet from 'react-helmet';
import useSiteMetadata from '../components/SiteMetadata';

export default function PublishedPage({ location }) {
  const data = useStaticQuery(publishedPageQuery);
  const content = data.markdownRemark.html;
  const pageName = 'Publicerat';
  const { title } = useSiteMetadata();

  return (
    <Layout location={location} editLink={editPageUrl('published')}>
      <Helmet title={`${pageName} | ${title}`} />
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
