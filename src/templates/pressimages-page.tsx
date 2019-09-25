import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PressImagesPageTemplate } from './pressimages-page-template';

export default function PressImagesPage({ location }) {
  const data = useStaticQuery(pressImagesPageQuery);
  const content = data.markdownRemark.html;
  const pressImages = data.markdownRemark.frontmatter.downloadableimages;

  return (
    <Layout location={location} editLink={editPageUrl('pressimages')}>
      <PressImagesPageTemplate
        contentComponent={HTMLContent}
        title="Pressbilder"
        content={content}
        headerImageFile={data.fileName}
        pressImages={pressImages}
        location={location}
      />
    </Layout>
  );
}

const pressImagesPageQuery = graphql`
  query PressImagesPage {
    markdownRemark(frontmatter: { templateKey: { eq: "pressimages-page" } }) {
      html
      frontmatter {
        downloadableimages {
          childImageSharp {
            fluid(maxWidth: 500) {
              src
              srcSet
              aspectRatio
              sizes
              base64
              originalName
            }
            original {
              width
              height
              src
            }
          }
        }
      }
    }
    fileName: file(
      relativePath: { eq: "hidden/alexander-dummer-aS4Duj2j7r4-unsplash.jpg" }
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
