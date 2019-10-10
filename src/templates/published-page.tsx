import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PublishedPageTemplate } from './published-page-template';
import Helmet from 'react-helmet';
import useSiteMetadata from '../components/SiteMetadata';
import { LocationProp } from '../interfaces/LocationProp';

export default function PublishedPage({ location }: LocationProp) {
  const data = useStaticQuery(publishedPageQuery);
  const content = data.markdownRemark.html;
  const pageName = 'Publicerat';
  const { title } = useSiteMetadata();

  return (
    <Layout
      location={location}
      editLink={editPageUrl('published')}
      pageTitle={pageName}
      pageDescription="Länkar till sådant som publicerats i annan media av/om mig"
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
