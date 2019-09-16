import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PressImagesPageTemplate } from './pressimages-page-template';
import { getFluid } from '../images';

export default function PressImagesPage({ location }) {
  const data = useStaticQuery(pressImagesPageQuery);
  const content = data.markdownRemark.html;

  return (
    <Layout location={location} editLink={editPageUrl('pressimages')}>
      <PressImagesPageTemplate
        contentComponent={HTMLContent}
        title="Pressbilder"
        content={content}
        imageFile={data.fileName}
      />
    </Layout>
  );
}

function getImageFrom(data) {
  if (!data || !data.fileName) return null;

  return getFluid(data.fileName);
}

const pressImagesPageQuery = graphql`
  query PressImagesPage {
    markdownRemark(frontmatter: { templateKey: { eq: "pressimages-page" } }) {
      html
    }
    fileName: file(
      relativePath: { eq: "hidden/alexander-dummer-aS4Duj2j7r4-unsplash.jpg" }
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
