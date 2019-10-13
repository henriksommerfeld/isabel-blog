import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import Layout from '../components/Layout';
import { PressImagesPageTemplate } from './pressimages-page-template';
import { LocationProp } from '../interfaces/LocationProp';

export default function PressImagesPage({ location }: LocationProp) {
  const data = useStaticQuery(pressImagesPageQuery);
  const content = data.markdownRemark.html;
  const pageName = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;
  const pressImages = data.markdownRemark.frontmatter.downloadableimages;

  return (
    <Layout
      location={location}
      editLink={editPageUrl('pressimages')}
      pageTitle={pageName}
      pageDescription={description}
    >
      <PressImagesPageTemplate
        contentComponent={HTMLContent}
        title={pageName}
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
        title
        description
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
