import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import { AboutPageTemplate } from './about-page-template';
import { LocationProp } from '../interfaces/LocationProp';
import useSiteMetadata from '../components/SiteMetadata';
import Helmet from 'react-helmet';
import { FluidObject } from 'gatsby-image';
import { ImageProps } from 'components/PreviewCompatibleImage';

export default function AboutPage({ location }: LocationProp) {
  const data = useStaticQuery<AboutPageData>(aboutPageQuery);
  const content = data.markdownRemark.html;
  const portraitImage = data.markdownRemark.frontmatter.image;
  const pageName = 'Om mig';
  const { title } = useSiteMetadata();

  return (
    <Layout location={location} editLink={editPageUrl('about')}>
      <Helmet title={`${pageName} | ${title}`} />
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={pageName}
        content={content}
        backgroundImageFile={data.fileName}
        portraitImageFile={portraitImage}
        location={location}
      />
    </Layout>
  );
}

interface AboutPageData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
      image: ImageProps;
    };
  };
  fileName: FluidObject;
}

const aboutPageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 300) {
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
    fileName: file(
      relativePath: { eq: "hidden/clarisse-meyer-jKU2NneZAbI-unsplash.jpg" }
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
